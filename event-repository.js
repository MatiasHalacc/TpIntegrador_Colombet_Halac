import DBConfig from './src/configs/DBConfig.js';
import pkg from 'pg'
const { Client, Pool } = pkg;

export default class EventRepository {
getAllAsync = async () => {
  let returnArray = null;
  const client = new Client(DBConfig);
  console.log({client})
  try {
    await client.connect();
    const sql = `SELECT * FROM public.events`;
    const result = await client.query(sql);
    await client.end();
    returnArray = result.rows;
  } catch (error) {
    console.error('Error al obtener eventos:', error.message, error.stack);
  }
  return returnArray;
}
getByIdAsync = async (id) => {
    const idINT = parseInt(id);
    let returnRows = null;
    const client = new Client(DBConfig);
    try {
      await client.connect();
      const sql = `
        SELECT e.*, el.*, l.*, p.*, u1.*
        FROM public.events e
        INNER JOIN public.event_locations el ON e.id_event_location = el.id
        INNER JOIN public.locations l ON el.id_location = l.id
        INNER JOIN public.provinces p ON l.id_province = p.id
        INNER JOIN public.users u1 ON e.id_creator_user = u1.id
        WHERE e.id = $1
      `;
      const result = await client.query(sql, [idINT]);
      await client.end();
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al obtener evento por id:', error.message, error.stack);
      throw error; 
    }
  }

  getFilteredEventAsync = async (name, startDate, tag) => {
    const client = new Client(DBConfig);
    let query = `SELECT * FROM public.events WHERE 1=1`;  // Inicia con una consulta que siempre es verdadera
    const params = [];

    if (name) {
      query += ` AND name ILIKE $${params.length + 1}`;  // Filtrar por nombre, sin distinguir mayúsculas/minúsculas
      params.push(`%${name}%`);
    }

    if (startDate) {
      query += ` AND start_date >= $${params.length + 1}`;  // Filtrar por fecha de inicio
      params.push(startDate);
    }

    if (tag) {
      query += ` AND tag ILIKE $${params.length + 1}`;  // Filtrar por tag
      params.push(`%${tag}%`);
    }

    try {
      await client.connect();
      const result = await client.query(query, params);  
      await client.end();
      return result.rows;  
    } catch (error) {
      console.error('Error al obtener eventos filtrados:', error.message, error.stack);
      throw error;
    }
  };

  
  createAsync = async (user) => {
    const client = new Client(DBConfig);
    await client.connect();
  
    const sql = `
      INSERT INTO public.users (first_name, last_name, username, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  
    const values = [
      user.first_name,
      user.last_name,
      user.username,
      user.password
    ];
  
    const result = await client.query(sql, values);
    console.log('Usuario insertado:', result.rows[0]); 
    await client.end();
  
    return result.rows[0];
  }

  getUserByUsername = async (username) => {
    const client = new Client(DBConfig);
    await client.connect();
    const sql = `SELECT * FROM public.users WHERE username = $1 LIMIT 1`;
    const result = await client.query(sql, [username]);
    await client.end();
    return result.rows[0] || null;
  };
  
  getEventById = async (id) => {
    const client = new Client(DBConfig);
    await client.connect();
    const sql = `SELECT * FROM public.events WHERE id = $1`;
    const result = await client.query(sql, [id]);
    await client.end();
    return result.rows[0] || null;
  };

  getMaxCapacityByLocationId = async (eventLocationId) => {
    const client = new Client(DBConfig);
    await client.connect();
    const sql = `
      SELECT el.*, l.max_capacity
      FROM public.event_locations el
      JOIN public.locations l ON el.id_location = l.id
      WHERE el.id = $1
    `;
    const result = await client.query(sql, [eventLocationId]);
    await client.end();
    return result.rows[0]?.max_capacity || null;
  };

  createEvent = async (event) => {
    const client = new Client(DBConfig);
    await client.connect();
    const sql = `
      INSERT INTO public.events 
      (name, description, start_date, price, enables_for_enrollment, duration_in_minutes, max_assistance, id_event_location, id_creator_user)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      event.name,
      event.description,
      event.start_date,
      event.price,
      event.enables_for_enrollment,
      event.duration_in_minutes,
      event.max_assistance,
      event.id_event_location,
      event.creatorUserId
    ];
    const result = await client.query(sql, values);
    await client.end();
    return result.rows[0];
  };

  updateEvent = async (event) => {
    const client = new Client(DBConfig);
    await client.connect();
    const sql = `
      UPDATE public.events SET 
        name = $1,
        description = $2,
        start_date = $3,
        price = $4,
        duration_in_minutes = $5,
        max_assistance = $6,
        id_event_location = $7
      WHERE id = $8
      RETURNING *;
    `;
    const values = [
      event.name,
      event.description,
      event.start_date,
      event.price,
      event.duration_in_minutes,
      event.max_assistance,
      event.id_event_location,
      event.id
    ];
    const result = await client.query(sql, values);
    await client.end();
    return result.rows[0];
  };

  deleteEvent = async (id) => {
    const client = new Client(DBConfig);
    await client.connect();
    const sql = `DELETE FROM public.events WHERE id = $1`;
    await client.query(sql, [id]);
    await client.end();
  };
}

//updateAsync = async (entity) => {  }
//deleteByIdAsync = async (id) => { }




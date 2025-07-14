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
      return result.rows;  // Retorna los eventos que coinciden con los filtros
    } catch (error) {
      console.error('Error al obtener eventos filtrados:', error.message, error.stack);
      throw error;
    }
  };
 }
//createAsync = async (entity) => {  }
//updateAsync = async (entity) => {  }
//deleteByIdAsync = async (id) => { }




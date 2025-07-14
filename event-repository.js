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
      throw error; // para que el controlador pueda capturar el error
    }
  }
  
  
 }
//createAsync = async (entity) => {  }
//updateAsync = async (entity) => {  }
//deleteByIdAsync = async (id) => { }




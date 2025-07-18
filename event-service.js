import EventRepository from './event-repository.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret';
export default class EventService {
    getAllAsync = async () => {
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
}

getByIdAsync = async (id) => {
    const repo = new EventRepository();          
    const event = await repo.getByIdAsync(id);   
    return event;                                
}
getFilteredEventAsync = async (name, startDate, tag) => {
    const repo = new EventRepository();
    const events = await repo.getFilteredEventAsync(name, startDate, tag);
    return events;
  };


createAsync = async (entity) => {
        const repo = new EventRepository();
        const user = await repo.createAsync(entity);
        return user;
 }

 createEvent = async (event) => {
    const repo = new EventRepository();
    await validateEventFields(event, repo);
    return await repo.createEvent(event);
};
updateEvent = async (event, userId) => {
    const repo = new EventRepository();
    const existing = await repo.getEventById(event.id);
    if (!existing) throw { status: 404, message: 'Evento no encontrado' };
    if (existing.id_creator_user !== userId) throw { status: 401, message: 'No autorizado para modificar este evento' };
    await validateEventFields(event, repo);
    return await repo.updateEvent(event);
};
deleteEvent = async (id, userId) => {
    const repo = new EventRepository();
    const existing = await repo.getEventById(id);
    if (!existing) throw { status: 404, message: 'Evento no encontrado' };
    if (existing.id_creator_user !== userId) throw { status: 401, message: 'No autorizado para eliminar este evento' };
    await repo.deleteEvent(id);
  };

}

const validateEventFields = async (event, repo) => {
    if (!event.name || event.name.length < 3) throw new Error('El name está vacío o tiene menos de 3 letras');
    if (!event.description || event.description.length < 3) throw new Error('El description está vacío o tiene menos de 3 letras');
    if (event.price <= 0) throw new Error('El price debe ser mayor que cero');
    if (event.duration_in_minutes <= 0) throw new Error('El duration_in_minutes debe ser mayor que cero');
    const maxCap = await repo.getMaxCapacityByLocationId(event.id_event_location);
    if (event.max_assistance > maxCap) throw new Error('El max_assistance no puede ser mayor al max_capacity del id_event_location');
};






const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const createUser = async (userData) => {
  if (!userData.first_name || userData.first_name.length < 3) {
    throw new Error('El campo first_name está vacío o tiene menos de tres letras');
  }
  if (!userData.last_name || userData.last_name.length < 3) {
    throw new Error('El campo last_name está vacío o tiene menos de tres letras');
  }
  if (!userData.username || !validateEmail(userData.username)) {
    throw new Error('El email (username) es sintácticamente inválido');
  }
  if (!userData.password || userData.password.length < 3) {
    throw new Error('El campo password está vacío o tiene menos de tres letras');
  }
  const service = new EventService();
  const createdUser = await service.createAsync(userData);
  return createdUser;
  };

  export const loginUser = async ({ username, password }) => {
    if (!username || !validateEmail(username)) {
      const error = new Error('El email es inválido.');
      error.statusCode = 400;
      throw error;
    }
  
    const repo = new EventRepository();
    const user = await repo.getUserByUsername(username);
  
    if (!user || user.password !== password) {
      const error = new Error('Usuario o clave inválida.');
      error.statusCode = 401;
      throw error;
    }
  
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  
    return {
      success: true,
      message: '',
      token,
    };
  };
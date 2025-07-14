import EventRepository from './event-repository.js';

export default class EventService {
    getAllAsync = async () => {
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
}

getByIdAsync = async (id) => {
    const repo = new EventRepository();          // Crear instancia del repositorio
    const event = await repo.getByIdAsync(id);   // Obtener un evento por su ID
    return event;                                // Devolver el evento encontrado
}

createAsync = async (entity) => { }
updateAsync = async (entity) => { }
deleteByIdAsync = async (id) => { }
}

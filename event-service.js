import EventRepository from './event-repository.js';

export default class EventService {
    getAllAsync = async () => {
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
}

getByIdAsync = async (id) =>{ }
createAsync = async (entity) => { }
updateAsync = async (entity) => { }
deleteByIdAsync = async (id) => { }
}

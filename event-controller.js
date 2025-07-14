import {Router} from 'express'
import EventService from './event-service.js'
const router = Router();
const svc = new EventService();

router.get('/', async (req, res) => {
    try {
      const returnArray = await svc.getAllAsync();
      if (returnArray != null) {
        return res.status(200).json(returnArray);
      } else { 
        return res.status(500).send('Error interno: retorno nulo');
      }
    } catch (error) {
      console.error('Error en getAllAsync:', error);
      return res.status(500).send('Error interno: ' + error.message);
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await svc.getByIdAsync(id); 
      if (result != null) {
        return res.status(200).json(result);         
      } else {
        return res.status(404).send('Evento no encontrado');
      }
    } catch (error) {
      console.error('Error en getByIdAsync:', error);
      return res.status(500).send('Error interno: ' + error.message);
    }
  });
  
  router.get('/', async (req, res) => {
    const { name, startDate, tag } = req.query; 
    try {
      const events = await svc.getFilteredEventAsync(name, startDate, tag); 
      if (events && events.length > 0) {
        return res.status(200).json(events);  
      } else {
        return res.status(404).send('No se encontraron eventos');
      }
    } catch (error) {
      console.error('Error al obtener eventos filtrados:', error);
      return res.status(500).send('Error interno: ' + error.message);
    }
  });
router.post('', async (req, res) => {  });
router.put('', async (req, res) => { });
router.delete('/:id', async (req, res) => { });

export default router;


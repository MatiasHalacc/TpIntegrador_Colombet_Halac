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
        return res.status(200).json(result);          // Retornar el evento
      } else {
        return res.status(404).send('Evento no encontrado'); // Si no se encontró
      }
    } catch (error) {
      console.error('Error en getByIdAsync:', error);
      return res.status(500).send('Error interno: ' + error.message);
    }
  });
  
router.get('/:id', async (req, res) => {  });
router.post('', async (req, res) => {  });
router.put('', async (req, res) => { });
router.delete('/:id', async (req, res) => { });

export default router;


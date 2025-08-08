import {Router} from 'express'
import EventService ,{createUser, loginUser} from './event-service.js'
import { authenticate } from './auth-middleware.js';
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  router.post('/register', async (req, res) => {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      console.error('Error:', err.message);
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      console.log('POST /login recibido con body:', req.body);
      const response = await loginUser(req.body);
      console.log('Login exitoso:', response);
      res.status(200).json(response);
    } catch (err) {
      console.error('Error en /login:', err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        token: '',
      });
    }
  });

  router.post('/event', authenticate, async (req, res) => {
    try {
      const newEvent = await svc.createEvent({ ...req.body, creatorUserId: req.user.id });
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  });
  
  router.put('/event', authenticate, async (req, res) => {
    try {
      const updated = await svc.updateEvent(req.body, req.user.id);
      res.status(200).json(updated);
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  });
  router.delete('/event/:id', authenticate, async (req, res) => {
    try {
      await svc.deleteEvent(parseInt(req.params.id), req.user.id);
      res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  });

  router.post('/:id/enrollment', authenticate, async (req, res) => {
    try {
      const newEvent = await svc.UserEvent({ ...req.body, id: parseInt(req.params.id)});
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(err.status || 400).json({ message: err.message });
    }
  });

export default router;


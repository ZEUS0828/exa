import { Router } from 'express';
import { getPronosticos, getPronosticoPorId, postPronostico, putPronostico, patchPronostico, deletePronostico } from '../controladores/pronosticoCtrl.js';

const router = Router();

// Rutas para manejar los pronósticos
router.get('/pronosticos', getPronosticos);  // Obtener todos los pronósticos
router.get('/pronosticos/:id', getPronosticoPorId);  // Obtener un pronóstico por ID
router.post('/pronosticos', postPronostico);  // Crear un nuevo pronóstico
router.put('/pronosticos/:id', putPronostico);  // Actualizar un pronóstico
router.patch('/pronosticos/:id', patchPronostico);  // Actualizar parcialmente un pronóstico
router.delete('/pronosticos/:id', deletePronostico);  // Eliminar un pronóstico

export default router;

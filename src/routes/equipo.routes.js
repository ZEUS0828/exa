import { Router } from 'express';
import { 
    getEquipos, 
    getEquipoPorId, 
    postEquipo, 
    putEquipo, 
    patchEquipo, 
    deleteEquipo 
} from '../controladores/equipoCtrl.js';

const router = Router();

// Rutas para el manejo de equipos
router.get('/equipos', getEquipos);  // Obtener todos los equipos
router.get('/equipos/:id', getEquipoPorId);  // Obtener un equipo por ID
router.post('/equipos', postEquipo);  // Crear un nuevo equipo
router.put('/equipos/:id', putEquipo);  // Actualizar un equipo por ID
router.patch('/equipos/:id', patchEquipo);  // Actualizar parcialmente un equipo por ID
router.delete('/equipos/:id', deleteEquipo);  // Eliminar un equipo por ID

export default router;

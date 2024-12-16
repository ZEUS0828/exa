import { Router } from 'express';
import { 
    getPartidos, 
    getPartidoPorId, 
    postPartido, 
    putPartido, 
    patchPartido, 
    deletePartido 
} from '../controladores/partidoCtrl.js';

const router = Router();

// Rutas para el manejo de partidos
router.get('/partidos', getPartidos);  // Obtener todos los partidos
router.get('/partidos/:id', getPartidoPorId);  // Obtener un partido por ID
router.post('/partidos', postPartido);  // Crear un nuevo partido
router.put('/partidos/:id', putPartido);  // Actualizar un partido por ID
router.patch('/partidos/:id', patchPartido);  // Actualizar parcialmente un partido por ID
router.delete('/partidos/:id', deletePartido);  // Eliminar un partido por ID

export default router;

import { Router } from 'express';
import { 
    getResultados, 
    getResultadoPorId, 
    postResultado, 
    putResultado, 
    patchResultado, 
    deleteResultado 
} from '../controladores/resultadoCtrl.js';

const router = Router();

// Rutas para el manejo de resultados
router.get('/resultados', getResultados);  // Obtener todos los resultados
router.get('/resultados/:id', getResultadoPorId);  // Obtener resultado por ID
router.post('/resultados', postResultado);  // Crear un nuevo resultado
router.put('/resultados/:id', putResultado);  // Actualizar un resultado por ID
router.patch('/resultados/:id', patchResultado);  // Actualizar parcialmente un resultado por ID
router.delete('/resultados/:id', deleteResultado);  // Eliminar un resultado por ID

export default router;

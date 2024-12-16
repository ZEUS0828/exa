import { Router } from 'express';
import { 
    getUsuarios, 
    getUsuarioPorId, 
    postUsuario, 
    putUsuario, 
    patchUsuario, 
    deleteUsuario 
} from '../controladores/usuarioCtrl.js';



const router = Router();

// Rutas para el manejo de usuarios
router.get('/usuarios', getUsuarios);  // Obtener todos los usuarios
router.get('/usuarios/:id', getUsuarioPorId);  // Obtener un usuario por ID
router.post('/usuarios', postUsuario);  // Crear un nuevo usuario
router.put('/usuarios/:id', putUsuario);  // Actualizar un usuario por ID
router.patch('/usuarios/:id', patchUsuario);  // Actualizar parcialmente un usuario por ID
router.delete('/usuarios/:id', deleteUsuario);  // Eliminar un usuario por ID

export default router;

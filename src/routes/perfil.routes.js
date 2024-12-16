import { Router } from 'express';
import { 
    getPerfiles, 
    getPerfilPorId, 
    postPerfil, 
    putPerfil, 
    patchPerfil, 
    deletePerfil 
} from '../controladores/perfilCtrl.js';

const router = Router();

// Rutas para el manejo de perfiles
router.get('/perfiles', getPerfiles);  // Obtener todos los perfiles
router.get('/perfiles/:id', getPerfilPorId);  // Obtener un perfil por ID
router.post('/perfiles', postPerfil);  // Crear un nuevo perfil
router.put('/perfiles/:id', putPerfil);  // Actualizar un perfil por ID
router.patch('/perfiles/:id', patchPerfil);  // Actualizar parcialmente un perfil por ID
router.delete('/perfiles/:id', deletePerfil);  // Eliminar un perfil por ID

export default router;

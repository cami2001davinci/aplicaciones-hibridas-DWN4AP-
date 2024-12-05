import express from 'express';
import { auth, getAllUsuarios, createUsuarios, loginUsuarios, getUsuariosById, updateUsuarios, deleteUsuarios} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/register', createUsuarios);

// Registro de un nuevo admin (solo permitido para superAdmins)
router.post("/admin/register", auth(["superAdmin"]), createUsuarios);
router.post ('/login', loginUsuarios);

router.get('/superadmin/usuarios', auth(['superAdmin']), getAllUsuarios);
router.delete('/superadmin/usuarios/:id', auth(['superAdmin']), deleteUsuarios);

router.get('/:id', auth(['alumno', 'admin', 'superAdmin']), getUsuariosById);

router.put('/:id', auth(['alumno', 'admin', 'superAdmin']), updateUsuarios);

// Nueva ruta para obtener múltiples usuarios por IDs
// router.post('/multiple', auth(['alumno', 'admin', 'superAdmin']), getMultipleUsuariosByIds);




export default router;


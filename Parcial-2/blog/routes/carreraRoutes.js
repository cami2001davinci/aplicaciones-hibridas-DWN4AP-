import express from 'express';
import { getAllCarreras, createCarrera, getCarreraById, updateCarrera, deleteCarrera, getPublicacionesByCarrera} from '../controllers/carreraController.js';
import { auth } from '../controllers/usuarioController.js'; // Importación del middleware auth

const router = express.Router();

// Rutas protegidas con el middleware auth
router.get('/carreras', auth(['alumno', 'admin', 'superAdmin']), getAllCarreras);
router.get('/carreras/:id', auth(['alumno', 'admin', 'superAdmin']), getCarreraById);

// Rutas para admin y superAdmin
router.post('/admin/carreras', auth(['admin', 'superAdmin']), createCarrera);
router.put('/admin/carreras/:id', auth(['admin', 'superAdmin']), updateCarrera);

// Ruta exclusiva para superAdmin
router.delete('/superadmin/carreras/:id', auth(['superAdmin']), deleteCarrera);

router.get('/:id/publicaciones', auth(['alumno', 'admin']), getPublicacionesByCarrera);

export default router;

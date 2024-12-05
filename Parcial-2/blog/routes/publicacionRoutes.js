import express from 'express';
import { getAllPublicaciones, createPublicaciones,  getPublicacionesById, updatePublicaciones, deletePublicaciones, createComentario} from '../controllers/publicacionesController.js';
import { auth } from '../controllers/usuarioController.js';
const router = express.Router();

router.post('/', auth(['alumno', 'admin']), createPublicaciones);

router.get('/', auth(), getAllPublicaciones);

router.get('/:id', auth(), getPublicacionesById);

router.put('/:id', auth(['alumno', 'admin']), updatePublicaciones);

router.delete('/:id', auth(['alumno', 'admin']), deletePublicaciones);

router.post('/:id/respuestas', auth(), createComentario);
export default router;

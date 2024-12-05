import express from 'express';
import { createTema, getForoByCarreraSlug, createRespuesta} from '../controllers/foroController.js';
import {createCategoria, getCategoriasByCarreraSlug} from '../controllers/categoriaController.js'

import { auth } from '../controllers/usuarioController.js';
const router = express.Router();

// Categorías
router.post('/carrera/:carrera_slug/categorias', auth(['alumno', 'admin']), createCategoria);
router.get('/carrera/:carrera_slug/categorias', getCategoriasByCarreraSlug);

// Temas
router.post('/categorias/:categoria_slug/temas', auth(['alumno', 'admin']), createTema);
router.get('/carrera/:carrera_slug', getForoByCarreraSlug);

router.post('/temas/:tema_slug/respuestas', auth(['alumno', 'admin']), createRespuesta);

// Exporta el router
export default router;
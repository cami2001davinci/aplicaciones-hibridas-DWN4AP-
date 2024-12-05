import express from 'express';
import { getHomePublicaciones, addComentario } from '../controllers/homeController.js';
// import { auth } from '../controllers/usuarioController.js'; // Importación del middleware auth

const router = express.Router();

// Rutas de la home
router.get('/home/publicaciones', getHomePublicaciones); // Obtener publicaciones de la home
router.post('/home/publicaciones/:id/comentarios', addComentario); // Agregar comentario a publicación

export default router;

import mongoose from 'mongoose'; // Importación de mongoose
import publicacionesModel from '../models/publicacionesModel.js'; // Asegúrate de que la ruta sea correcta

// Obtener publicaciones de tipo 'evento' y 'mascota' para la home
export const getHomePublicaciones = async (req, res) => {
    try {
        const publicaciones = await publicacionesModel
            .find({ tipo: { $in: ['evento', 'mascota'] } })
            .populate('autor_id', 'username') // Incluye datos del autor
            .sort({ fecha_publicacion: -1 }); // Ordenar por fecha

        res.status(200).json(publicaciones);
    } catch (error) {
        console.error("Error en getHomePublicaciones:", error);
        res.status(500).json({ error: 'Error al obtener publicaciones para la home' });
    }
};

// Agregar un comentario a una publicación
export const addComentario = async (req, res) => {
    try {
        console.log("Inicio del controlador addComentario");

        const { id } = req.params; // ID de la publicación
        const { contenido } = req.body; // Contenido del comentario

        console.log("ID recibido:", id, "Contenido recibido:", contenido);

        // Validar el ID de la publicación
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("ID inválido:", id);
            return res.status(400).json({ error: "ID inválido" });
        }

        // Validar que el usuario esté autenticado
        const autor_id = req.user?.id;
        if (!autor_id) {
            console.log("Usuario no autenticado"); // Mensaje de depuración
            return res.status(401).json({ error: "Usuario no autenticado" });
        }


        // Buscar la publicación
        console.log("Buscando publicación...");
        const publicacion = await publicacionesModel.findById(id);
        if (!publicacion) {
            console.log("Publicación no encontrada");
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        console.log("Publicación encontrada:", publicacion);

        // Crear un nuevo comentario
        const nuevoComentario = {
            autor_id,
            contenido,
            fecha_comentario: new Date(),
        };
        console.log("Nuevo comentario:", nuevoComentario);

        // Agregar el comentario al array
        publicacion.comentarios.push(nuevoComentario);

        // Guardar los cambios en la publicación
        console.log("Guardando publicación...");
        await publicacion.save();

        console.log("Publicación guardada con éxito");

        // Responder con el array de comentarios actualizado
        res.status(201).json({
            mensaje: "Comentario agregado con éxito",
            comentarios: publicacion.comentarios,
        });
    } catch (error) {
        // Manejo de errores
        console.error("Error en addComentario:", error.message);
        res.status(500).json({ error: "Error al agregar el comentario" });
    }
};

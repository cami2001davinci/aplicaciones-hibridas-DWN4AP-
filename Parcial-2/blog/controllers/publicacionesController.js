import publicacionesModel from '../models/publicacionesModel.js';
import usuarioModel from '../models/usuarioModel.js';
import carreraModel from "../models/carreraModel.js";

// Crear una publicación
// const createPublicaciones = async (req, res) => {
//     try {
//         // Obtener el ID del usuario autenticado desde el token
//         const autorId = req.user.id;

//         // Verificar si el usuario existe
//         const autor = await usuarioModel.findById(autorId);
//         if (!autor) {
//             return res.status(404).json({ error: "Usuario no encontrado." });
//         }

//         const { tipo, name, titulo, contenido, multimedia } = req.body; // Obtenemos los datos del cuerpo

//         let id_carrera = null;

//         if (tipo === 'evento' || tipo === 'mascota') {
//             if (autor.role !== 'admin') {
//                 return res.status(403).json({ error: `Solo los administradores pueden crear publicaciones de tipo '${tipo}'.` });
//             }
//         } else if (tipo === 'por_carrera') {
//             if (!name) {
//                 return res.status(400).json({ error: "Debe incluir el nombre de la carrera para publicaciones 'por_carrera'." });
//             }

//             const carrera = await carreraModel.findOne({ name });
//             if (!carrera) {
//                 return res.status(404).json({ error: `No se encontró una carrera con el nombre '${name}'.` });
//             }
//              id_carrera = carrera._id;
//         } else {
//             return res.status(400).json({ error: "Tipo de publicación no válido." });
//         }
        

//         // Crear la publicación sin necesidad de pasar el id_carrera en el cuerpo de la solicitud
//         const nuevaPublicacion = new publicacionesModel({
//             tipo,
//             titulo,
//             contenido,
//             multimedia,
//             autor_id: autor._id,  // Asignamos el autor automáticamente desde el usuario autenticado
//             id_carrera,           // Asignamos el id_carrera obtenido automáticamente
//         });

//         // Guardar la publicación en la base de datos
//         await nuevaPublicacion.save();

//         // Poblar los datos del autor y carrera para la respuesta
//         const publicacionConDatos = await publicacionesModel
//             .findById(nuevaPublicacion._id)
//             .populate('autor_id', 'username role') // Poblamos los datos del autor
//             .populate('id_carrera', 'name'); // Poblamos los datos de la carrera

//         res.status(201).json(publicacionConDatos);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error al crear la publicación." });
//     }
// };

const createPublicaciones = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado desde el token
        const autorId = req.user.id;

        // Verificar si el usuario existe
        const autor = await usuarioModel.findById(autorId);
        if (!autor) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        const { tipo, name, titulo, contenido, multimedia } = req.body;

        let id_carrera = null; // Declaramos la variable aquí

        if (tipo === 'evento' || tipo === 'mascota') {
            if (autor.role !== 'admin') {
                return res.status(403).json({ error: `Solo los administradores pueden crear publicaciones de tipo '${tipo}'.` });
            }
        } else if (tipo === 'por_carrera') {
            if (!name) {
                return res.status(400).json({ error: "Debe incluir el nombre de la carrera para publicaciones 'por_carrera'." });
            }

            const carrera = await carreraModel.findOne({ name });
            if (!carrera) {
                return res.status(404).json({ error: `No se encontró una carrera con el nombre '${name}'.` });
            }
            id_carrera = carrera._id; // Asignamos el valor a la variable declarada
        } else {
            return res.status(400).json({ error: "Tipo de publicación no válido." });
        }

        // Crear la publicación
        const nuevaPublicacion = new publicacionesModel({
            tipo,
            titulo,
            contenido,
            multimedia,
            autor_id: autor._id, // Asignamos el autor automáticamente desde el usuario autenticado
            id_carrera,          // Asignamos el id_carrera obtenido automáticamente
        });

        // Guardar la publicación en la base de datos
        await nuevaPublicacion.save();

        // Poblar los datos del autor y carrera para la respuesta
        const publicacionConDatos = await publicacionesModel
            .findById(nuevaPublicacion._id)
            .populate('autor_id', 'username role') // Poblamos los datos del autor
            .populate('id_carrera', 'name'); // Poblamos los datos de la carrera

        res.status(201).json(publicacionConDatos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la publicación." });
    }
};





// Obtener todas las publicaciones (con filtros opcionales)
const getAllPublicaciones = async (req, res) => {
    try {
        const { tipo, id_carrera, page = 1, limit = 10 } = req.query;

        const filtros = {};
        if (tipo) filtros.tipo = tipo;
        if (id_carrera) filtros.id_carrera = id_carrera;

        const publicaciones = await publicacionesModel
            .find(filtros)
            .populate('id_carrera', 'nombre') // Incluye el nombre de la carrera
            .populate('autor_id', 'nombre') // Incluye el nombre del autor
            .sort({ fecha_publicacion: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await publicacionesModel.countDocuments(filtros);

        res.status(200).json({ total, page, limit, publicaciones });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las publicaciones', error });
    }
};

// Obtener una publicación por ID
const getPublicacionesById = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await publicacionesModel
            .findById(id)
            .populate('id_carrera', 'nombre') // Incluye el nombre de la carrera
            .populate('autor_id', 'nombre'); // Incluye el nombre del autor

        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        res.status(200).json(publicacion);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la publicación', error });
    }
};

// Actualizar una publicación
const updatePublicaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, titulo, contenido, multimedia, id_carrera } = req.body;

        const publicacion = await publicacionesModel.findById(id);

        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        // Validaciones según el tipo
        if (tipo === 'mascota' && id_carrera) {
            return res.status(400).json({ mensaje: 'Las publicaciones de la mascota no deben estar asociadas a una carrera' });
        }
        if (tipo === 'por_carrera' && !id_carrera) {
            return res.status(400).json({ mensaje: 'Las publicaciones por carrera deben especificar una carrera' });
        }

        // Actualizar campos
        publicacion.tipo = tipo || publicacion.tipo;
        publicacion.titulo = titulo || publicacion.titulo;
        publicacion.contenido = contenido || publicacion.contenido;
        publicacion.multimedia = multimedia || publicacion.multimedia;
        publicacion.id_carrera = tipo === 'por_carrera' ? id_carrera : null;

        const publicacionActualizada = await publicacion.save();
        res.status(200).json(publicacionActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la publicación', error });
    }
};

// Eliminar una publicación
const deletePublicaciones = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await publicacionesModel.findById(id);

        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        await publicacionesModel.findByIdAndDelete(id);
        res.status(200).json({ mensaje: 'Publicación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la publicación', error });
    }
};

// Añadir un like a una publicación
const darLike = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await publicacionesModel.findById(id);
        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        // Incrementar el contador de likes
        publicacion.likes += 1;
        await publicacion.save();

        res.status(200).json({ mensaje: 'Like agregado', likes: publicacion.likes });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar el like', error });
    }
};

// Añadir un comentario a una publicación
const createComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { autor_id, contenido } = req.body;

        const publicacion = await publicacionesModel.findById(id);
        if (!publicacion) {
            return res.status(404).json({ mensaje: 'Publicación no encontrada' });
        }

        // Crear un nuevo comentario
        const nuevoComentario = {
            autor_id,
            contenido
        };

        // Añadir el comentario a la lista de comentarios
        publicacion.comentarios.push(nuevoComentario);
        await publicacion.save();

        res.status(201).json({ mensaje: 'Comentario agregado', comentarios: publicacion.comentarios });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar el comentario', error });
    }
};

export {
    getAllPublicaciones,
    createPublicaciones,
    getPublicacionesById,
    updatePublicaciones,
    deletePublicaciones,
    darLike,
    createComentario
};

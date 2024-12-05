import respuestasModel from '../models/respuestasModel.js';
import temasModel from '../models/temasModel.js';

/**
 * Crear una respuesta asociada a un tema identificado por su slug.
 */
export const createRespuestas = async (req, res) => {
    try {
        const { contenido, tema_slug } = req.body; // Datos de la solicitud
        const autor_id = req.user.id; // ID del usuario autenticado (extraído del middleware de autenticación)

        // Buscar el tema por su slug
        const tema = await temasModel.findOne({ slug: tema_slug });
        if (!tema) {
            return res.status(404).json({ error: "Tema no encontrado." });
        }

        // Crear la nueva respuesta asociándola al tema encontrado
        const nuevaRespuesta = new respuestasModel({
            contenido,
            tema_id: tema._id,
            autor_id,
            parent_id,
            fecha_creacion: new Date() // Registrar la fecha de creación
        });

        // Guardar la respuesta en la base de datos
        await nuevaRespuesta.save();

        res.status(201).json({
            message: "Respuesta creada con éxito.",
            respuesta: nuevaRespuesta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la respuesta." });
    }
};

/**
 * Obtener todas las respuestas relacionadas con un tema identificado por su slug.
 */
export const getRespuestasByTemaSlug = async (req, res) => {
    try {
        const { tema_slug } = req.params;

        const tema = await temasModel.findOne({ slug: tema_slug });
        if (!tema) return res.status(404).json({ error: "Tema no encontrado." });

        // Obtener todas las respuestas del tema
        const respuestas = await respuestasModel.find({ tema_id: tema._id });

        // Construir un árbol de respuestas
        const respuestaMap = {};
        respuestas.forEach((respuesta) => {
            respuestaMap[respuesta._id] = { ...respuesta._doc, sub_respuestas: [] };
        });

        const respuestasRaiz = [];
        respuestas.forEach((respuesta) => {
            if (respuesta.parent_id) {
                respuestaMap[respuesta.parent_id].sub_respuestas.push(respuestaMap[respuesta._id]);
            } else {
                respuestasRaiz.push(respuestaMap[respuesta._id]);
            }
        });

        res.status(200).json({
            tema: tema.titulo,
            respuestas: respuestasRaiz
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las respuestas." });
    }
};


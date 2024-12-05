
import categoriaModel from '../models/categoriaModel.js';
import temasModel from '../models/temasModel.js';
import respuestasModel from '../models/respuestasModel.js';
import carreraModel from '../models/carreraModel.js';

export const getForoByCarreraSlug = async (req, res) => {
    try {
        const { carrera_slug } = req.params;
        const { pagina = 1, limite = 10 } = req.query; // Valores por defecto

        const carrera = await carreraModel.findOne({ slug: carrera_slug });
        if (!carrera) {
            return res.status(404).json({ error: "Carrera no encontrada." });
        }

        const categorias = await categoriaModel
            .find({ carrera_id: carrera._id })
            .populate({
                path: 'temas',
                populate: {
                    path: 'respuestas',
                    options: {
                        sort: { fecha_creacion: -1 },
                        skip: (pagina - 1) * limite,
                        limit: parseInt(limite, 10),
                    },
                    populate: {
                        path: 'autor_id',
                        select: 'username',
                    },
                },
            });

        res.status(200).json({ carrera: carrera.name, categorias });
    } catch (error) {
        console.error("Error al obtener el foro:", error.message);
        res.status(500).json({ error: "Error al obtener el foro." });
    }
};



export const createTema = async (req, res) => {
    try {
        const { categoria_slug } = req.params;
        const { titulo, descripcion } = req.body;
        const autor_id = req.user.id;

        // Buscar la categoría
        const categoria = await categoriaModel.findOne({ slug: categoria_slug });
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada." });
        }

        // Crear el tema
        const nuevoTema = new temasModel({
            titulo,
            descripcion,
            categoria_id: categoria._id,
            autor_id,
            slug: titulo.toLowerCase().replace(/ /g, '-')
        });

        await nuevoTema.save();

        // Agregar el tema a la categoría
        categoria.temas.push(nuevoTema._id);
        await categoria.save();

        res.status(201).json(nuevoTema);
    } catch (error) {
        console.error("Error al crear el tema:", error.message);
        res.status(500).json({ error: "Error al crear el tema." });
    }
};


export const createRespuesta = async (req, res) => {
    try {
        const { tema_slug } = req.params;  // Usamos el slug del tema
        const { contenido } = req.body;
        const autor_id = req.user.id;

        // Buscar el tema usando el slug
        const tema = await temasModel.findOne({ slug: tema_slug });
        if (!tema) {
            return res.status(404).json({ error: "Tema no encontrado." });
        }

        // Crear la nueva respuesta
        const nuevaRespuesta = new respuestasModel({
            contenido,
            autor_id,
            tema_id: tema._id,  // Asegúrate de asociar la respuesta con el tema por su _id
        });

        await nuevaRespuesta.save();

        // Agregar la respuesta al tema
        tema.respuestas.push(nuevaRespuesta._id);
        await tema.save();

        // Responder con la nueva respuesta creada
        res.status(201).json(nuevaRespuesta);
    } catch (error) {
        console.error("Error al crear la respuesta:", error.message);
        res.status(500).json({ error: "Error al crear la respuesta." });
    }
};


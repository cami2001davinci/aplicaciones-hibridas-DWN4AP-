import temasModel from '../models/temasModel.js';
import categoriaModel from '../models/categoriaModel.js';

export const createTemas = async (req, res) => {
    try {
        const { titulo, descripcion, categoria_slug } = req.body;

        // Validar que el usuario esté autenticado
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado o inválido." });
        }

        const autor_id = req.user.id;

        // Buscar la categoría por su slug
        const categoria = await categoriaModel.findOne({ slug: categoria_slug });
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada." });
        }

        // Crear el nuevo tema
        const nuevoTema = new temasModel({
            titulo,
            descripcion,
            categoria_id: categoria._id,
            autor_id,
            slug: titulo.toLowerCase().replace(/ /g, "-") 
        });

        await nuevoTema.save();

        res.status(201).json({
            message: "Tema creado con éxito.",
            tema: nuevoTema
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el tema." });
    }
};



export const getTemasByCategoriaSlug = async (req, res) => {
    try {
        const { categoria_slug } = req.params;

        // Buscar categoría por slug
        const categoria = await categoriaModel.findOne({ slug: categoria_slug });
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada." });
        }

        // Buscar temas relacionados con la categoría
        const temas = await temasModel.find({ categoria_id: categoria._id });
        res.status(200).json(temas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los temas." });
    }
};

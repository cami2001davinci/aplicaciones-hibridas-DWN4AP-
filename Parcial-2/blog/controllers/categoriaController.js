import categoriaModel from '../models/categoriaModel.js';
import carreraModel from '../models/carreraModel.js';

export const createCategoria = async (req, res) => {
    try {
        const { carrera_slug } = req.params; // Se obtiene de la URL
        const { name, descripcion, slug } = req.body;

        // Validar campos obligatorios
        if (!name || !descripcion || !slug) {
            return res.status(400).json({ error: "Los campos 'name', 'descripcion' y 'slug' son obligatorios." });
        }

        // Buscar carrera por slug
        const carrera = await carreraModel.findOne({ slug: carrera_slug });
        if (!carrera) {
            return res.status(404).json({ error: "Carrera no encontrada." });
        }

        // Crear y guardar la nueva categoría
        const nuevaCategoria = new categoriaModel({
            name,
            slug,
            descripcion,
            carrera_id: carrera._id
        });

        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        console.error("Error al crear categoría:", error.message);
        res.status(500).json({ error: "Error al crear la categoría." });
    }
};

// Obtener categorías por slug de carrera
export const getCategoriasByCarreraSlug = async (req, res) => {
    try {
        const { carrera_slug } = req.params;

        // Buscar la carrera por el slug
        const carrera = await carreraModel.findOne({ slug: carrera_slug });
        if (!carrera) {
            return res.status(404).json({ error: "Carrera no encontrada." });
        }

        // Buscar categorías relacionadas con la carrera
        const categorias = await categoriaModel.find({ carrera_id: carrera._id });
        res.status(200).json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error.message);
        res.status(500).json({ error: "Error al obtener las categorías." });
    }
};

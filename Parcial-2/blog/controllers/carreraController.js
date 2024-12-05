import carreraModel from "../models/carreraModel.js";
import publicacionesModel from "../models/publicacionesModel.js";



const getAllCarreras = async (req, res) => {
  try {
    const carreras = await carreraModel.find();
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarreraById = async (req, res) => {
  try {
    const carrera = await carreraModel.findById(req.params.id);
    if (!carrera) return res.status(404).json({ message: 'carrera no encontrada' });
    res.json(carrera);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCarrera = async (req, res) => {
  const { name, description } = req.body;
  try {
    const nuevaCarrera = new carreraModel({ name, description });
    await nuevaCarrera.save();
    res.status(201).json(nuevaCarrera);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCarrera = async (req, res) => {
  try {
    const carrera = await carreraModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!carrera) return res.status(404).json({ message: 'carrera no encontrada' });
    res.json(carrera);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCarrera = async (req, res) => {
  try {
    const carrera = await carreraModel.findByIdAndDelete(req.params.id);
    if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' });
    res.json({ message: 'Carrera eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicacionesByCarrera = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la carrera existe
    const carrera = await carreraModel.findById(id);
    if (!carrera) {
      return res.status(404).json({ message: "Carrera no encontrada" });
    }

    // Buscar publicaciones que pertenezcan a esta carrera
    const publicaciones = await publicacionesModel.find({ tipo: 'por_carrera', id_carrera: id });
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener publicaciones", error });
  }
};

export {
    getAllCarreras,
    createCarrera,
    getCarreraById,
    updateCarrera,
    deleteCarrera,
    getPublicacionesByCarrera,
};

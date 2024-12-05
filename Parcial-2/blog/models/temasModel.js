import mongoose from 'mongoose';

const TemaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Slug único
    categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias', required: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
    respuestas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'respuestas' }],// Asegúrate de tener este campo
    fecha_creacion: { type: Date, default: Date.now }
});

const temaModel = mongoose.model('temas', TemaSchema);
export default temaModel;

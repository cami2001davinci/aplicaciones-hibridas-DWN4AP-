import mongoose from 'mongoose';

const RespuestaSchema = new mongoose.Schema({
    contenido: { type: String, required: true },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
    tema_id: { type: mongoose.Schema.Types.ObjectId, ref: 'temas', required: true },
    fecha_respuesta: { type: Date, default: Date.now },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'respuestas', default: null }, // Referencia a la respuesta padre
});

const respuestaModel = mongoose.model('respuestas', RespuestaSchema);
export default respuestaModel;

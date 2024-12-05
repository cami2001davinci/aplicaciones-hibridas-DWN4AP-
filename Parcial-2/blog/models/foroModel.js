import mongoose from 'mongoose';

const ForoSchema = new mongoose.Schema({
  carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fecha_creacion: { type: Date, default: Date.now },
  comentarios: [
    {
      autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
      contenido: { type: String, required: true },
      fecha: { type: Date, default: Date.now }
    }
  ]
});

const foroModel = mongoose.model('foro', ForoSchema);
export default foroModel; 


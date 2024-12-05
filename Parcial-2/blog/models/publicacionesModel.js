import mongoose from 'mongoose';

const Schema = mongoose.Schema;



const PublicacionSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    multimedia: { type: String },
    autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
    id_carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'carrera' },
    fecha_publicacion: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comentarios: [{
        autor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
        contenido: { type: String, required: true },
        fecha_comentario: { type: Date, default: Date.now }
    }]
});


const publicacionesModel = mongoose.model('publicaciones', PublicacionSchema);
export default publicacionesModel;

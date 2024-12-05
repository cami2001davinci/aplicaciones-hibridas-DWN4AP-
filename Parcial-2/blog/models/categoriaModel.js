import mongoose from 'mongoose';


const CategoriaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, required: true }, // Ahora el slug se debe pasar manualmente
    descripcion: { type: String, required: true },
    carrera_id: { type: mongoose.Schema.Types.ObjectId, ref: 'carrera', required: true },
    fecha_creacion: { type: Date, default: Date.now },
    temas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'temas' }]
});


const categoriaModel = mongoose.model('categorias', CategoriaSchema);
export default categoriaModel;

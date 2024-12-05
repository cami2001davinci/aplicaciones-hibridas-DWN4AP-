// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const CarreraSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     description: {
//         type: String
//     }
// });


// const carreraModel = mongoose.model('carrera', CarreraSchema);
// export default carreraModel;

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CarreraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        required: true // Asegura que no haya slugs duplicados
    }
});

// Middleware para generar el slug automáticamente antes de guardar
CarreraSchema.pre('save', function (next) {
    console.log('Generando slug...');
    if (this.name && !this.slug) {
        this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    next();
});

const carreraModel = mongoose.model('carrera', CarreraSchema);
export default carreraModel;

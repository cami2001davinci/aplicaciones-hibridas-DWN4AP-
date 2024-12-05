import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UsuarioSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin', 'alumno', 'superAdmin'], default: 'alumno'
    }, 

},  { timestamps: true });

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Contraseña después de hashear:", this.password);
    next();
});

const usuarioModel = mongoose.model('usuario', UsuarioSchema);
export default usuarioModel; 

import usuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsuarioSchema } from "../validation/validaciones.js";


dotenv.config();

// Middleware para validar autorización y roles
const auth = (rolesPermitidos = []) => (req, res, next) => {
    const headersToken = req.headers.authorization;

    if (!headersToken) {
        return res.status(401).json({ message: "No se proporcionó un token" });
    }

    const token = headersToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }

        // LOG: Decodifica el token y verifica el payload
        console.log("Payload decodificado del token:", payload); // <- Aquí agregas el registro
        req.user = { id: payload.id, role: payload.role }; 


        // LOG: Verifica los roles permitidos
        console.log("Roles permitidos:", rolesPermitidos);
        console.log("Rol del usuario autenticado:", req.user.role);

        if (rolesPermitidos.length && !rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        

        next();
    });
};

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

// Crear un nuevo usuario //ANTES DE MODIFICAR

// const createUsuarios = async (req, res) => {
//     const { username, email, password, role } = req.body;


//     try {
//         // Validar datos con Joi
//         const { error } = UsuarioSchema.validate(req.body, { abortEarly: false });
//         if (error) {
//             return res.status(400).json({
//                 message: "Errores de validación",
//                 errors: error.details.map((err) => err.message),
//             });
//         }

//         // Verificar si el email ya existe
//         const usuarioExistente = await usuarioModel.findOne({ email });
//         if (usuarioExistente) {
//             return res.status(400).json({ message: "El email ya está registrado" });
//         }

//         // Determinar el rol del usuario
//         let asignarRole = "alumno"; // Por defecto, asignar el rol 'alumno'

//         // validar permisos si intenta asignar un rol elevado
//         if(role && role !== "alumno"){
//             if(!req.user || req.user.role !== "superAdmin"){
//                 return res.status(403).json({message:"No tienes permiso para asignar este rol"})
//             }
//             asignarRole = role // solo el superAdmin puede asignar roles elevados
//         }

//         // Crear hash de la contraseña
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Guardar nuevo usuario
//         const newUsuario = new usuarioModel({
//             username,
//             email,
//             password: hashedPassword,
//             role: asignarRole,
//         });

//         await newUsuario.save();
//         res.status(201).json({ message: "Usuario creado con éxito", usuario: newUsuario });
//     } catch (error) {
//         console.error("Error al crear usuario:", error); // Asegúrate de que esto esté presente
//         res.status(500).json({ message: "Error en el servidor", error: error.message });
//     }
    
// };

const createUsuarios = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const { error } = UsuarioSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Errores de validación",
                errors: error.details.map((err) => err.message),
            });
        }

        const usuarioExistente = await usuarioModel.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        let asignarRole = "alumno";

        if (role && role !== "alumno") {
            if (!req.user || req.user.role !== "superAdmin") {
                return res.status(403).json({ message: "No tienes permiso para asignar este rol" });
            }
            asignarRole = role;
        }

        // Crea el usuario directamente, sin hashear manualmente la contraseña
        const newUsuario = new usuarioModel({
            username,
            email,
            password, // Deja la contraseña tal como la recibe, el middleware se encargará.
            role: asignarRole,
        });

        await newUsuario.save();
        console.log("Usuario guardado en la BD:", newUsuario);
        res.status(201).json({ message: "Usuario creado con éxito", usuario: newUsuario });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
//ANTES DE MODIFICAR
// const loginUsuarios = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const usuario = await usuarioModel.findOne({ email });
//         if (!usuario) {
//             return res.status(404).json({ message: "Usuario no encontrado" });
//         }

//         // Validar la contraseña
//         const validarPassword = await bcrypt.compare(password, usuario.password);
//         if (!validarPassword) {
//             return res.status(401).json({ message: "Contraseña incorrecta" });
//         }

//         // Generar el token
//         const token = jwt.sign(
//             { id: usuario._id, email: usuario.email, role: usuario.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ message: "Inicio de sesión exitoso", token });
//     } catch (error) {
//         console.error("Error en loginUsuarios:", error); // Agrega esto
//         res.status(500).json({ message: "Error en el servidor", error });
//     }
// };


// Iniciar sesión
const loginUsuarios = async (req, res) => {
    console.log("Entró al controlador de login"); // Verifica si la solicitud llega al controlador
    const { email, password } = req.body;
    console.log("Email recibido:", email);
    console.log("Contraseña recibida desde el cliente:", password);

    try {
        const usuario = await usuarioModel.findOne({ email });
        console.log("Usuario encontrado en la BD:", usuario);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log("Contraseña almacenada en la BD:", usuario.password);

        // Comparar la contraseña ingresada con el hash en la base de datos
        const validarPassword = await bcrypt.compare(password, usuario.password);
        console.log("Resultado de bcrypt.compare:", validarPassword);

        if (!validarPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, role: usuario.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Token generado:", token);
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error en loginUsuarios:", error); // Si ocurre un error inesperado
        res.status(500).json({ message: "Error en el servidor", error });
    }
};



// Obtener usuario por ID
const getUsuariosById = async (req, res) => {
    const usuariosId = req.params.id;

    try {
        const usuario = await usuarioModel.findById(usuariosId);

        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Actualizar un usuario por ID
const updateUsuarios = async (req, res) => {
    const usuariosId = req.params.id;
    const { role } = req.body;

    try {
        // Validar datos con Joi
        const { error } = UsuarioSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Errores de validación",
                errors: error.details.map((err) => err.message),
            });
        }

        // Si se intenta actualizar el rol, verificar permisos
        if (role && role !== "alumno") {
            if (!req.user || req.user.role !== "superAdmin") {
                return res.status(403).json({
                    message: "No tienes permisos para asignar este rol",
                });
            }
        }

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(
            usuariosId,
            req.body,
            { new: true }
        );
        if (usuarioActualizado) {
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


// Eliminar un usuario por ID
const deleteUsuarios = async (req, res) => {
    const usuariosId = req.params.id;

    try {
        const usuarioEliminado = await usuarioModel.findByIdAndDelete(usuariosId);

        if (usuarioEliminado) {
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};



// Obtener múltiples usuarios por sus IDs
// const getMultipleUsuariosByIds = async (req, res) => {
//     const { ids } = req.body;

//     if (!Array.isArray(ids) || ids.length === 0) {
//         return res.status(400).json({ message: "Debes proporcionar un array de IDs válido." });
//     }

//     try {
//         // Convertir los IDs a ObjectId
//         const objectIds = ids.map((id) => {
//             if (mongoose.Types.ObjectId.isValid(id)) {
//                 return new mongoose.Types.ObjectId(id);
//             } else {
//                 throw new Error(`El ID proporcionado (${id}) no es válido.`);
//             }
//         });

//         const usuarios = await usuarioModel.find({ _id: { $in: objectIds } });
//         res.status(200).json(usuarios);
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
//     }
// };



export {
    auth,
    getAllUsuarios,
    createUsuarios,
    loginUsuarios,
    getUsuariosById,
    updateUsuarios,
    deleteUsuarios,
    // getMultipleUsuariosByIds, // Exporta la nueva función
};
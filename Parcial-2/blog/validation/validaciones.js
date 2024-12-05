import Joi from "joi"


const UsuarioSchema = Joi.object({
    username: Joi.string()
    .alphanum().min(3).max(30).required().messages({
        "string.alphanum": "El nombre de usuario solo puede contener letras y números.",
        "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
        "string.max": "El nombre de usuario no puede tener más de 30 caracteres.",
        "any.required": "El nombre de usuario es obligatorio.",
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required() .messages({
        "string.pattern.base": "La contraseña debe tener entre 3 y 15 caracteres alfanuméricos.",
        "any.required": "La contraseña es obligatoria.",
    }),
    role: Joi.string().valid('admin', 'alumno', 'superAdmin').optional(),  
});

export {UsuarioSchema};
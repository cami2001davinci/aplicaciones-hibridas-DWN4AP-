const validateField = (name, value) => {
    const errors = {};
    switch (name) {
        case 'username':
            if (!value) errors.username = 'El nombre de usuario es obligatorio.';
            else if (!/^[a-zA-Z0-9]{3,30}$/.test(value))
                errors.username = 'El nombre de usuario debe tener entre 3 y 30 caracteres y solo contener letras y números.';
            break;
        case 'email':
            if (!value) errors.email = 'El correo electrónico es obligatorio.';
            else if (!/\S+@\S+\.\S+/.test(value))
                errors.email = 'El correo electrónico no es válido.';
            break;
        case 'password':
            if (!value) errors.password = 'La contraseña es obligatoria.';
            else if (value.length < 6)
                errors.password = 'La contraseña debe tener al menos 6 caracteres.';
            break;
        default:
            break;
    }
    return errors;
};

export default validateField;
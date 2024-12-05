// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Register = () => {
//     const { registerUser } = useContext(AuthContext); // Asegúrate de usar registerUser
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.email || !formData.password || !formData.username) {
//             setError('Por favor completa todos los campos');
//             return;
//         }
//         try {
//             const response = await registerUser(formData); // Llama a registerUser en lugar de loginUser
//             if (response.message) {
//                 setError(response.message); // Maneja posibles errores desde la API
//             } else {
//                 console.log('Usuario registrado con éxito:', response);
//             }
//         } catch (err) {
//             setError('Error en el registro. Inténtalo de nuevo.');
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <h1>Registro</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="username">Nombre de usuario</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email">Correo electrónico</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Contraseña</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <button type="submit">Registrarse</button>
//             </form>
//         </div>
//     );
// };

// export default Register;

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import validateField from '../utils/validateField';

const Register = () => {
    const initialState = { email: '', password: '', username: '' };
    const { formData, errors, touchedFields, isFormValid, handleChange, handleBlur } = useFormValidation(initialState, validateField);
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!isFormValid()) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }

        const response = await registerUser(formData);
        if (response.message) {
            setError(response.message);
        } else {
            navigate('/login'); // Redirigir al login después del registro
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Registrarse</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.username && errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.email && errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touchedFields.password && errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
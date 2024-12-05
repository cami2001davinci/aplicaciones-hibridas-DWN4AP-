// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';




// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { loginUser } = useContext(AuthContext);
//     const navigate = useNavigate(); // Usa navigate

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!email || !password) {
//             setError('Por favor, completa todos los campos.');
//             return;
//         }

//         const response = await loginUser({ email, password }, navigate);
//         if (response.message) {
//             setError(response.message);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4">Iniciar Sesión</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Correo Electrónico</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Contraseña</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
//             </form>
//             <p className="mt-3 text-center">
//                 ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
//             </p>
//         </div>
//     );
// };

// export default Login;
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import useFormValidation from '../hooks/useFormValidation';
import validateField from '../utils/validateField';

const Login = () => {
    const initialState = { email: '', password: '' };
    const { formData, errors, touchedFields, isFormValid, handleChange, handleBlur } = useFormValidation(initialState, validateField);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!isFormValid()) {
            setError('Por favor, completa todos los campos correctamente.');
            return;
        }

        try {
            const response = await loginUser(formData);

            if (response.token) {
                Cookies.set('jwToken', response.token, { secure: true, sameSite: 'Strict' });
                navigate('/'); // Redirigir al home después del login
            } else {
                setError(response.message || 'Error al iniciar sesión.');
            }
        } catch (err) {
            setError('Hubo un problema al intentar iniciar sesión.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
            <p className="mt-3 text-center">
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;


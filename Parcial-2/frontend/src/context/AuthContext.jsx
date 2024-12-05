import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Sin llaves

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null); // Estado para almacenar el token

    // useEffect(() => {
    //     const token = Cookies.get('jwToken');
    //     if (token) {
    //         setAuthToken(token); // Almacena el token en el estado
    //         const decoded = jwtDecode(token);// Decodificar el token
    //         console.log(decoded);  
    //         setUser({
    //             id: decoded.id,        // Usar decoded.id en lugar de decoded.usuario.id
    //             email: decoded.email,  // Usar decoded.email en lugar de decoded.usuario.email
    //             username: decoded.username,  // Usar decoded.username en lugar de decoded.usuario.username
    //             role: decoded.role,    // Usar decoded.role en lugar de decoded.usuario.role
    //         });
    //     }
    // }, []);
    useEffect(() => {
        const token = Cookies.get('jwToken'); // Recuperar token de las cookies
        if (token) {
            try {
                // Decodificar el token
                const decoded = jwtDecode(token);
                console.log("Token decodificado:", decoded);

                // Verificar expiración del token (opcional)
                if (decoded.exp * 1000 < Date.now()) {
                    console.warn("El token ha expirado.");
                    Cookies.remove('jwToken'); // Eliminar token expirado
                } else {
                    setAuthToken(token); // Guardar token válido
                    setUser({
                        id: decoded.id,
                        email: decoded.email,
                        username: decoded.username,
                        role: decoded.role,
                    });
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, []);
    

    const logoutUser = () => {
        setUser(null);
        setAuthToken(null); // Limpia el token del estado
        Cookies.remove('jwToken');
    };

    const registerUser = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
    
            if (data.token) {
                Cookies.set('jwToken', data.token);
                setUser({
                    id: data.usuario.id,
                    email: data.usuario.email,
                    username: data.usuario.username,
                    role: data.usuario.role,
                });
            }
    
            return data; // Regresamos los datos para manejar la lógica en el componente
        } catch (error) {
            console.error('Error en el registro:', error);
            return { message: 'Error al registrar usuario' };
        }
    };
    

    const loginUser = async (userData, navigate) => {
        try {
            const response = await fetch('http://localhost:5000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            // Validar respuesta
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Datos del servidor:', data);
    
            if (data.token) {
                // Guardar token en cookies
                Cookies.set('jwToken', data.token);
    
                // Decodificar el token
                const decoded = jwtDecode(data.token);
                console.log('Token decodificado:', decoded);
    
                // Actualizar estado del usuario
                setUser({
                    id: decoded.id,
                    email: decoded.email,
                    username: decoded.username,
                    role: decoded.role,
                });
    
                // Redirección según el rol del usuario
                if (navigate) {
                    if (decoded.role === 'alumno') {
                        navigate('/'); // Redirige al Home
                    } else if (['admin', 'superAdmin'].includes(decoded.role)) {
                        navigate('/dashboard'); // Redirige al Dashboard
                    }
                }
            }
    
            return data; // Devuelve los datos del servidor
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            return { message: error.message || 'Error al iniciar sesión' };
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, setUser, authToken, logoutUser, registerUser, loginUser }}>

            {children}
        </AuthContext.Provider>
    );
};

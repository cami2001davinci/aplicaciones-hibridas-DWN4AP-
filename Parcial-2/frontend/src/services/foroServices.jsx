// src/services/foroServices.jsx
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:5000'; // Cambia esto si tu backend tiene otro dominio/puerto

// Función para obtener los headers con el token
const getHeaders = () => {
    const token = Cookies.get('jwToken');
    if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
    }
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            throw new Error("El token ha expirado. Por favor, inicia sesión nuevamente.");
        }
    } catch (error) {
        console.error("Error al procesar el token:", error);
        throw new Error("Error al procesar el token.");
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};

// Obtener el foro por carrera (slug)
export const getForoByCarrera = async (slug) => {
    try {
        const headers = getHeaders();
        console.log("Headers enviados:", headers);
        console.log("Ruta solicitada:", `${API_URL}/foro/carrera/${slug}`);
        const response = await axios.get(`${API_URL}/foro/carrera/${slug}`, { headers });
        console.log("Respuesta del servidor:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el foro:", error.response?.data || error.message);
        throw error;
    }
};

// Obtener un usuario por ID
export const getUserById = async (ids) => {
    try {
        const headers = getHeaders();
        const response = await axios.post(`${API_URL}/usuarios`, { ids }, { headers });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        throw error;
    }
};

// Añadir respuesta a un tema
export const addReplyToTema = async (replyData) => {
    try {
        const response = await axios.post(`${API_URL}/foro/respuestas`, replyData, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error al añadir respuesta:', error);
        throw error;
    }
};

// Obtener todos los temas
export const fetchTemas = async () => {
    try {
        const response = await axios.get(`${API_URL}/temas`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener temas:", error);
        throw error;
    }
};

// Añadir un nuevo tema
export const addTema = async (tema) => {
    try {
        const response = await axios.post(`${API_URL}/temas`, tema, {
            headers: getHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error al añadir tema:", error);
        throw error;
    }
};
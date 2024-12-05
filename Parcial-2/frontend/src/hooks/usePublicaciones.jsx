import { useState, useEffect } from 'react';
import axios from 'axios';

const usePublicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(null);

    // Obtener publicaciones para la home (tipo 'evento' y 'mascota')
    const fetchHomePublicaciones = async () => {
        try {
            const res = await axios.get('http://localhost:5000/home/publicaciones'); // URL del backend
            setPublicaciones(res.data);
        } catch (err) {
            console.error("Error al obtener publicaciones:", err);
            setError(err.response?.data?.error || "Error desconocido");
        }
    };

    // Obtener publicaciones por carrera
    const fetchCarreraPublicaciones = async (carreraId) => {
        try {
            const res = await axios.get(`http://localhost:5000/carreras/${carreraId}/publicaciones`);
            setPublicaciones(res.data);
        } catch (err) {
            console.error("Error al obtener publicaciones de la carrera:", err);
            setError(err.response?.data?.error || "Error desconocido");
        }
    };


    // Agregar comentario a una publicación
    const addComentario = async (publicacionId, contenido) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/home/publicaciones/${publicacionId}/comentarios`,
                { contenido }
            );
            console.log("Comentario agregado con éxito:", res.data);
            return res.data;
        } catch (err) {
            console.error("Error al agregar comentario:", err);
            throw new Error(err.response?.data?.error || "Error desconocido");
        }
    };

    useEffect(() => {
        fetchHomePublicaciones();
    }, []);

    return {
        publicaciones,
        error,
        fetchHomePublicaciones,
        fetchCarreraPublicaciones,
        addComentario,
    };
};

export default usePublicaciones;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PublicacionDetail = () => {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState(null);

    useEffect(() => {
        const fetchPublicacion = async () => {
            const response = await axios.get(`/api/publicaciones/${id}`);
            setPublicacion(response.data);
        };
        fetchPublicacion();
    }, [id]);

    if (!publicacion) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h1>{publicacion.titulo}</h1>
            <p>{publicacion.contenido}</p>
            <h3>Comentarios</h3>
            <ul>
                {publicacion.comentarios.map((comentario) => (
                    <li key={comentario._id}>
                        <p>{comentario.contenido}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PublicacionDetail;
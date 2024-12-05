import React, { useState } from 'react';
import usePublicaciones from '../hooks/usePublicaciones';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
const Home = () => {
    const { publicaciones, error, addComentario } = usePublicaciones();
    const [comentarios, setComentarios] = useState({}); // Estado para manejar los comentarios por publicación

    const handleAddComentario = async (publicacionId) => {
        try {
            if (!comentarios[publicacionId]) return; // No hacer nada si el comentario está vacío
            await addComentario(publicacionId, comentarios[publicacionId]);
            setComentarios({ ...comentarios, [publicacionId]: "" }); // Limpiar el campo después de agregar el comentario
        } catch (err) {
            console.error("Error al agregar comentario:", err);
        }
    };

    const handleChangeComentario = (publicacionId, value) => {
        setComentarios({ ...comentarios, [publicacionId]: value });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Home - Publicaciones</h1>
            {error && <p className="text-danger text-center">Error: {error}</p>}
            {publicaciones.length === 0 ? (
                <p className="text-center">Cargando publicaciones...</p>
            ) : (
                <div className="d-flex flex-column align-items-center">
                    {publicaciones.map((pub) => (
                        <div className="card mb-4 w-75" key={pub._id}>
                            <div className="card-body">
                                <h2 className="card-title">{pub.titulo}</h2>
                                <p className="card-text">{pub.descripcion}</p>
                                <p className="text-muted">Autor: {pub.autor_id.username}</p>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddComentario(pub._id);
                                    }}
                                >
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={comentarios[pub._id] || ""} // Usar el valor del comentario para esta publicación
                                            onChange={(e) =>
                                                handleChangeComentario(pub._id, e.target.value)
                                            }
                                            placeholder="Agregar comentario"
                                        />
                                        <button type="submit" className="btn btn-primary">
                                            Comentar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
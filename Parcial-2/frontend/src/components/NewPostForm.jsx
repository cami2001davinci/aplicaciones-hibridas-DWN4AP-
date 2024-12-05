import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NewPostForm.css'; // Importa tus estilos personalizados

const NewPostForm = ({ onNewPost }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoriaSlug, setCategoriaSlug] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/publicaciones`, { tipo: 'por_carrera', name: categoriaSlug, titulo, contenido });
      onNewPost(response.data);
      setTitulo('');
      setContenido('');
      setCategoriaSlug('');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  };

  return (
    <div className="card mt-3 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Categoría"
              value={categoriaSlug}
              onChange={(e) => setCategoriaSlug(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
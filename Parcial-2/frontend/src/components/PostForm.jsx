import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ temaSlug, onNewReply }) => {
  const [contenido, setContenido] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/foro/temas/${temaSlug}/respuestas`, { contenido });
      onNewReply(response.data);
      setContenido('');
    } catch (error) {
      console.error('Error al añadir la respuesta:', error);
    }
  };

  return (
    <div className="card mt-3 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Escribe una respuesta..."
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Responder
          </button>
        </form>
      </div>
    </div>
  );
};


export default PostForm;
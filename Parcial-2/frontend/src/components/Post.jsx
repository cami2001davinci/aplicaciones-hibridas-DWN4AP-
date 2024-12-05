import React, { useState } from 'react';
import Reply from './Reply';
import PostForm from './PostForm';

const Post = ({ tema }) => {
  const [respuestas, setRespuestas] = useState(tema.respuestas);

  const handleNewReply = (newReply) => {
    setRespuestas((prev) => [...prev, newReply]);
  };

  return (
    <div className="card my-3 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h5 className="card-title">{tema.titulo}</h5>
        <p className="card-text">{tema.descripcion}</p>
        <p className="text-muted">
          <small>Publicado por: {tema.autor_id.username}</small>
        </p>
        <hr />
        <div>
          {respuestas.map((resp) => (
            <Reply key={resp._id} respuesta={resp} />
          ))}
        </div>
        <PostForm temaSlug={tema.slug} onNewReply={handleNewReply} />
      </div>
    </div>
  );
};


export default Post;

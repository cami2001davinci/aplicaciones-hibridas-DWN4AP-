import React from 'react';

const Reply = ({ respuesta }) => {
  return (
    <div className="my-2">
      <p>
        <strong>{respuesta.autor_id.username}:</strong> {respuesta.contenido}
      </p>
      <small className="text-muted">
        {new Date(respuesta.fecha_respuesta).toLocaleString()}
      </small>
    </div>
  );
};

export default Reply;
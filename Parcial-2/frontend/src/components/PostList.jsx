import React from 'react';
import Post from './Post';

const PostList = ({ temas }) => {
  return (
    <div>
      {temas.length === 0 ? (
        <p>No hay temas en esta categoría.</p>
      ) : (
        temas.map((tema) => (
          <Post key={tema._id} tema={tema} />
        ))
      )}
    </div>
  );
};

export default PostList;
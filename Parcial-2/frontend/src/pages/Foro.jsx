import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PostList from '../components/PostList';
import NewPostForm from '../components/NewPostForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Foro.css'; 

const Foro = () => {
  const { carrera_slug } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [foro, setForo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/foro/carrera/${carrera_slug}`);
        setForo(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar el foro');
        setLoading(false);
      }
    };

    fetchData();
  }, [user, carrera_slug, navigate]);

  const handleNewPost = (newPost) => {
    setForo((prev) => ({
      ...prev,
      categorias: prev.categorias.map((categoria) =>
        categoria.slug === newPost.categoria_id
          ? { ...categoria, temas: [...categoria.temas, newPost] }
          : categoria
      ),
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!foro || !foro.carrera) return <div>No se encontraron datos del foro</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Foro de {foro.carrera}</h1>
      <NewPostForm onNewPost={handleNewPost} />
      {foro.categorias.map((categoria) => (
        <div key={categoria._id} className="mt-4">
          <h2 className="text-center">{categoria.name}</h2>
          <PostList temas={categoria.temas} />
        </div>
      ))}
    </div>
  );
};


export default Foro;
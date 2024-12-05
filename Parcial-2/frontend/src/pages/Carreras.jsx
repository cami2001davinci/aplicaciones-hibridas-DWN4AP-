// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Carreras = () => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     return <h1>Página de Carreras</h1>;
// };

// export default Carreras;
// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Carreras = () => {
//     const { user } = useContext(AuthContext);

//     // Simulación de datos de carreras
//     const carreras = [
//         { id: 1, nombre: 'Ingeniería en Sistemas', adminOnly: false },
//         { id: 2, nombre: 'Diseño Gráfico', adminOnly: false },
//         { id: 3, nombre: 'Eventos Especiales', adminOnly: true },
//     ];

//     // Filtrar carreras si hay restricciones por rol
//     const carrerasDisponibles = carreras.filter(carrera =>
//         user.role === 'admin' || !carrera.adminOnly
//     );

//     return (
//         <div>
//             <h1>Carreras</h1>
//             <ul>
//                 {carrerasDisponibles.map(carrera => (
//                     <li key={carrera.id}>{carrera.nombre}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Carreras;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getForoByCarrera } from '../services/foroServices'; // Importa la función de la API

const Carreras = () => {
    const { carreraSlug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [temas, setTemas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [selectedTema, setSelectedTema] = useState(null);

    useEffect(() => {
        // Reiniciar estados al cambiar de carrera
        setCategorias([]);
        setTemas([]);
        setRespuestas([]);
        setSelectedCategoria(null);
        setSelectedTema(null);

        const fetchCategorias = async () => {
            const token = Cookies.get('jwToken');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const data = await getForoByCarrera(carreraSlug); // Usar la función de la API
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar categorías:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, [carreraSlug, navigate]);

    const fetchTemas = async (categoriaSlug) => {
        setTemas([]);
        setRespuestas([]);
        setSelectedTema(null);
        setLoading(true);

        const token = Cookies.get('jwToken');

        try {
            const response = await fetch(
                `http://localhost:5000/foro/temas/categoria/${categoriaSlug}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                throw new Error('Error al obtener temas.');
            }

            const data = await response.json();
            setTemas(data);
            setSelectedCategoria(categoriaSlug);
        } catch (error) {
            console.error('Error al cargar temas:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRespuestas = async (temaSlug) => {
        setLoading(true);

        const token = Cookies.get('jwToken');

        try {
            const response = await fetch(
                `http://localhost:5000/foro/respuestas/tema/${temaSlug}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                throw new Error('Error al obtener respuestas.');
            }

            const data = await response.json();
            setRespuestas(data.respuestas);
            setSelectedTema(data.tema);
        } catch (error) {
            console.error('Error al cargar respuestas:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Foro - {carreraSlug}</h1>

            {/* Listado de categorías */}
            <div>
                <h2>Categorías</h2>
                <ul>
                    {categorias.map((cat) => (
                        <li key={cat.slug} onClick={() => fetchTemas(cat.slug)}>
                            {cat.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Listado de temas */}
            {temas.length > 0 && (
                <div>
                    <h2>Temas en {selectedCategoria}</h2>
                    <ul>
                        {temas.map((tema) => (
                            <li key={tema.slug} onClick={() => fetchRespuestas(tema.slug)}>
                                {tema.titulo}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Listado de respuestas */}
            {respuestas.length > 0 && (
                <div>
                    <h2>Respuestas al tema: {selectedTema}</h2>
                    <ul>
                        {respuestas.map((resp, index) => (
                            <li key={index}>{resp.contenido}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Carreras;





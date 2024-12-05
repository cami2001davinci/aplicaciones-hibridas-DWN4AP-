// import { Link } from 'react-router-dom';

// const Navbar = () => (
//     <nav>
//         <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/carreras">Carreras</Link></li>

//         </ul>
//     </nav>
// );

// export default Navbar;

// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleCarreraClick = (carrera) => {
//         if (user) {
//             navigate(`/carreras/${carrera}`);
//         } else {
//             navigate('/login'); // Redirige al login si el usuario no está autenticado
//         }
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                 {/* Logo */}
//                 <Link className="navbar-brand" to="/">MiLogo</Link>

//                 {/* Botón para el menú colapsable */}
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 {/* Contenido colapsable */}
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     {/* Menú de Carreras */}
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <button
//                                 className="nav-link btn btn-link"
//                                 onClick={() => handleCarreraClick('diseño-multimedial')}
//                             >
//                                 Diseño Multimedial
//                             </button>
//                         </li>
//                         <li className="nav-item">
//                             <button
//                                 className="nav-link btn btn-link"
//                                 onClick={() => handleCarreraClick('desarrollo-web')}
//                             >
//                                 Desarrollo Web
//                             </button>
//                         </li>
//                         <li className="nav-item">
//                             <button
//                                 className="nav-link btn btn-link"
//                                 onClick={() => handleCarreraClick('diseño-industrial')}
//                             >
//                                 Diseño Industrial
//                             </button>
//                         </li>
//                     </ul>

//                     {/* Botones de Login/Register */}
//                     <div className="d-flex">
//                         {!user ? (
//                             <>
//                                 <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
//                                 <Link className="btn btn-outline-success" to="/register">Register</Link>
//                             </>
//                         ) : (
//                             <>
//                                 {user.role === 'admin' || user.role === 'superAdmin' ? (
//                                     <Link className="btn btn-outline-primary me-2" to="/dashboard">Dashboard</Link>
//                                 ) : (
//                                     <Link className="btn btn-outline-primary me-2" to="/">Home</Link>
//                                 )}
//                                 <button className="btn btn-outline-danger" onClick={() => navigate('/login')}>
//                                     Login
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login'); // Redirige al login tras cerrar sesión
    };

    const handleCarreraClick = (carrera) => {
        if (user) {
            navigate(`/foro/carrera/${carrera}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MiLogo</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={() => handleCarreraClick('diseo-multimedial')}
                            >
                                Diseño Multimedial
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={() => handleCarreraClick('diseo-web')}
                            >
                                Desarrollo Web
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={() => handleCarreraClick('diseño-industrial')}
                            >
                                Diseño Industrial
                            </button>
                        </li>
                    </ul>

                    <div className="d-flex">
                        {!user ? (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                                <Link className="btn btn-outline-success" to="/register">Register</Link>
                            </>
                        ) : (
                            <>
                                {user.role === 'admin' || user.role === 'superAdmin' ? (
                                    <Link className="btn btn-outline-primary me-2" to="/dashboard">Dashboard</Link>
                                ) : (
                                    <Link className="btn btn-outline-primary me-2" to="/">Home</Link>
                                )}
                                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

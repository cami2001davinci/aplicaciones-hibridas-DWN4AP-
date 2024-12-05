// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar'; // Ajusta la ruta según la ubicación del componente
// import Home from './pages/Home'
// import Login from './pages/Login'; 
// import Register from './pages/Register'; 
// import Carreras from './pages/Carreras'; 
// import { AuthContextProvider } from './context/AuthContext';

// function App() {
  
  
//   return (
//     <AuthContextProvider>
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/carreras" element={<Carreras />} />
//       </Routes>
//     </Router>
//   </AuthContextProvider>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import Carreras from './pages/Carreras'; // Nueva página para carreras
import PrivateRoute from './routes/PrivateRoute';
import { AuthContextProvider } from './context/AuthContext'; // Importa el provider
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Necesario para el funcionamiento de JavaScript de Bootstrap
import Navbar from './components/Navbar';
import Foro from './pages/Foro'


const App = () => {
    return (
            <Router>
        <AuthContextProvider>
            <Navbar /> 
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/foro/carrera/:carrera_slug" element={<Foro />} />
                    <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute roles={['admin']}><Dashboard /></PrivateRoute>} />
                    <Route path="/carreras/:carreraSlug" element={<PrivateRoute roles={['usuario', 'admin']}><Carreras /></PrivateRoute>} />

                    {/* Rutas protegidas por autenticación */}
                    <Route
                        path="/perfil"
                        element={
                            <PrivateRoute>
                                <Perfil />
                            </PrivateRoute>
                        }
                    />

                    {/* Rutas protegidas por autenticación y rol */}
                    <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/carreras/:carreraSlug"
                    element={
                        <PrivateRoute roles={['usuario', 'admin']}>
                            <Carreras />
                        </PrivateRoute>
                    }
                />

                </Routes>
        </AuthContextProvider>
            </Router>
    );
};

export default App;



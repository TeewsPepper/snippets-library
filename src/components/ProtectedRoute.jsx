
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Contexto para la autenticación

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Si no está autenticado, redirige al usuario a la página de inicio de sesión
    return <Navigate to="/" />;
  }

  // Si está autenticado, muestra el contenido protegido
  return children;
};

export default ProtectedRoute;

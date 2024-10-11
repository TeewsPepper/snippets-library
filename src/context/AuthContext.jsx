// src/context/AuthContext.js
/* Desde el paquete de react extraemos tres hook, uno para manejar el estado, otro para manejar el comportamiento del componente cada vez que un estado cambie y otro para crear un contexto que permita manejar un estado global */
import React, { useContext, useEffect, useState } from 'react';

/* Aquí extraemos la funcionalidad de autenticación que nos facilita el paquete firebase desde el archivo de configuración que hemos creado */
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  
  // Función de logout
  const logout = () => {
    return signOut(auth);
  };
  
  const value = {
    currentUser,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

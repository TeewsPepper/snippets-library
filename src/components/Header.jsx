import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './Header.css';

// Función para validar el formato del email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Header = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegisterForm(false);
    setError(''); // Resetea los errores al cambiar de formulario
  };

  const handleSignUpClick = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);
    setError(''); // Resetea los errores al cambiar de formulario
  };

  // Función para manejar el login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Sanitizar la entrada
    const sanitizedLoginEmail = DOMPurify.sanitize(loginEmail);
    const sanitizedLoginPassword = DOMPurify.sanitize(loginPassword);
    
    // Validar que los campos no estén vacíos y que el email sea válido
    if (!sanitizedLoginEmail || !sanitizedLoginPassword) {
      setError('Email y contraseña son obligatorios.');
      return;
    }

    if (!isValidEmail(sanitizedLoginEmail)) {
      setError('Por favor ingresa un email válido.');
      return;
    }

    signInWithEmailAndPassword(auth, sanitizedLoginEmail, sanitizedLoginPassword)
      .then((userCredential) => {
        
        setError(''); // Limpiar error al iniciar sesión correctamente
        navigate('/library');
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError('Error al iniciar sesión. Revisa tus credenciales.');
      });
  };

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();

    // Sanitizar la entrada
    const sanitizedRegisterEmail = DOMPurify.sanitize(registerEmail);
    const sanitizedRegisterPassword = DOMPurify.sanitize(registerPassword);
    
    // Validar que los campos no estén vacíos y que el email sea válido
    if (!sanitizedRegisterEmail || !sanitizedRegisterPassword) {
      setError('Email y contraseña son obligatorios.');
      return;
    }

    if (!isValidEmail(sanitizedRegisterEmail)) {
      setError('Por favor ingresa un email válido.');
      return;
    }

    createUserWithEmailAndPassword(auth, sanitizedRegisterEmail, sanitizedRegisterPassword)
      .then((userCredential) => {
        console.log('Registered:', userCredential.user);
        setError(''); 
        setRegisterEmail('');
        setRegisterPassword('');
        navigate('/library');
      })
      .catch((error) => {
        console.error('Error registering:', error);
        setError('Error al registrarse. Revisa tus datos.');
      });
  };

  // Función para iniciar sesión como invitado
  const handleGuestLogin = () => {
    const guestEmail = "guestUser@example.com"; // Cambia esto por el email de tu usuario de prueba
    const guestPassword = "guestPassword"; // Cambia esto por la contraseña de tu usuario de prueba

    signInWithEmailAndPassword(auth, guestEmail, guestPassword)
      .then((userCredential) => {
        setError('');
        navigate('/library');
      })
      .catch((error) => {
        console.error('Error logging in as guest:', error);
        setError('Error al iniciar sesión como invitado.');
      });
  };

  return (
    <div className="container">
      <h1 className="logo">LA TAPERA INVISIBLE</h1>

      {/* Mostrar errores si existen */}
      {error && <p className="error-message">{error}</p>}

      {/* Formulario de inicio de sesión */}
      <form className={`sign-in-form ${showLoginForm ? 'active' : ''}`} onSubmit={handleLogin}>
        <label htmlFor="login-email">Email:</label>
        <input 
          type="email" 
          id="login-email" 
          value={loginEmail} 
          onChange={(e) => setLoginEmail(e.target.value)} 
        />

        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          id="login-password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      

      {/* Formulario de registro */}
      <form className={`register-form ${showRegisterForm ? 'active' : ''}`} onSubmit={handleRegister}>
        <label htmlFor="register-email">Email:</label>
        <input 
          type="email" 
          id="register-email" 
          value={registerEmail} 
          onChange={(e) => setRegisterEmail(e.target.value)} 
        />

        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          id="register-password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      {/* Botones para alternar entre los formularios */}
      <div className="btn-container">
        <button type="button" onClick={handleSignInClick}>
          Sign in
        </button>
        <button type="button" onClick={handleSignUpClick}>
          Sign up
        </button>
        <button type="button" onClick={handleGuestLogin}>O entrar como invitado</button>
      </div>
    </div>
  );
};

export default Header;

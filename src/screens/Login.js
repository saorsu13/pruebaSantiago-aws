import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal';
import '../styles/LoginStyle.css'

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleIniciarSesion = async () => {
    try {
      const response = await fetch('https://30a0-3-215-255-70.ngrok-free.app/api/login', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: correo,
        password: contrasena,
      }),
    });

    console.log("Respuesta del servidor:", response);

    if (!response.ok) {
      console.error('Error al iniciar sesión (código de estado):', response.status);
      const errorMessage = await response.text();
      console.error('Error al iniciar sesión (detalles):', errorMessage || 'Detalles no disponibles');
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      setIsModalOpen(true);
      return;
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Error al iniciar sesión: La respuesta no tiene el tipo de contenido JSON esperado.');
      setError('Error en el formato de la respuesta del servidor.');
      setIsModalOpen(true);
      return;
    }

    const responseData = await response.json();
    console.log('Token obtenido:', responseData.token);
    setToken(responseData.token);
    localStorage.setItem('token', responseData.token);
    navigate('/Home');

    } catch (error) {
      console.error('Error al iniciar sesión (excepción):', error);
      setError('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
      setIsModalOpen(true);
    }
    
  };
  

  const handleRegistroClick = () => {
    navigate('/register');
  };
  const handleCloseModal = () => {
    setError('');
    setIsModalOpen(false);
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contenedor-centrado">
      <img src="/iconoblanco.png" alt="Ícono del banco" className="icono-banco" />
      <h1 className="nombre-banco">FinanziaBank</h1>
      <p>Confianza para tu futuro financiero</p>
      <h2>Inicia Sesión</h2>
      <label>Correo electronico:</label>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        onTouchStart={handleTouchStart} // Manejar el evento onTouchStart para evitar el zoom al tocar el campo de entrada
      />
      <label>Contraseña:</label>
      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        onTouchStart={handleTouchStart} // Manejar el evento onTouchStart para evitar el zoom al tocar el campo de entrada
      />
      <button onClick={handleIniciarSesion}>Iniciar Sesión</button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={error}
        color="#D23642"
      />
      <p className="registro" onClick={handleRegistroClick}>¿No tienes una cuenta? Regístrate aquí</p>
    </div>
  );
};

export default Login;

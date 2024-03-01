import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegisterStyle.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleCrearUsuario = async () => {
    try {
      if (!/^[a-zA-Z]+$/.test(nombre)) {
        alert('El nombre solo debe contener letras.');
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(correo)) {
        alert('El correo electrónico debe tener un formato válido. Ejemplo: nombre@dominio.com');
        return;
      }      

      if (contrasena.length < 5) {
        alert('La contraseña debe tener al menos 5 caracteres.');
        return;
      }
      await axios.post('https://8377-2800-484-6883-ca10-83-f5dc-3e02-8db0.ngrok-free.app/api/register', {
        name: nombre,
        email: correo,
        password: contrasena
      });
      
      navigate('/');
      alert('Usuario creado con éxito');
    } catch (error) {
      console.error('Error al crear usuario:', error.response);
      alert('Error al crear usuario. Verifica la consola para obtener más detalles.');
    }
  };
  
  const handleLoginClick = () => {
    navigate('/');
  };
  
  return (
    <div className="contenedor-centrado">
      <img src="/iconoblanco.png" alt="Ícono del banco" className="icono-banco" />
      <h1 className="nombre-banco">FinanziaBank</h1>
      <p>Confianza para tu futuro financiero</p>
      
      <h2>Crear Usuario</h2>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label>Correo:</label>
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />

      <label>Contraseña:</label>
      <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

      <button onClick={handleCrearUsuario}>Crear Usuario</button>
      <p className="login" onClick={handleLoginClick}>¿Ya tienes una cuenta? Inicia sesión aquí</p>
    </div>
  );
};

export default Register;
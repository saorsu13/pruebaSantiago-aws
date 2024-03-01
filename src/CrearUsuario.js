import React, { useState } from 'react';
import axios from 'axios';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleCrearUsuario = async () => {
  try {
    await axios.post('http://localhost:5000/api/usuarios', {
      name: nombre,
      email: correo,
      password: contrasena
    });
    console.log('Usuario creado con éxito');
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};
  
  return (
    <div>
      <h2>Crear Usuario</h2>
      <label>Nombre:</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <label>Correo:</label>
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />

      <label>Contraseña:</label>
      <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

      <button onClick={handleCrearUsuario}>Crear Usuario</button>
    </div>
  );
};

export default CrearUsuario;

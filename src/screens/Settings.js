import React, { useState } from 'react';
import Header from '../components/Header';
import { Navigate } from 'react-router-dom';


const Settings = () => {
  const [token, setToken] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('https://8377-2800-484-6883-ca10-83-f5dc-3e02-8db0.ngrok-free.app/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al cerrar sesión: ${response.statusText}`);
      }
      setToken(''); 
      console.log('Cerrar sesión...');
      Navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <h2>Configuración</h2>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Settings;

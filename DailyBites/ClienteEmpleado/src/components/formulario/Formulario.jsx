// src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../loginbtn/LoginButton';
import { io } from 'socket.io-client';

// Conectar al servidor Socket.IO
const socket = io('http://localhost:3001');

const LoginForm = () => {
  const [tiendas, setTiendas] = useState([]);
  const [selectedTienda, setSelectedTienda] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiendas');
        const data = await response.json();
        setTiendas(data);
      } catch (error) {
        console.error('Error fetching tiendas:', error);
      }
    };

    fetchTiendas();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    // Emitir el evento de login a través de Socket.IO
    socket.emit('login', { tienda: selectedTienda, password });

    // Escuchar la respuesta del servidor
    socket.on('loginResponse', (result) => {
      if (result.success) {
        // Guardar la tienda autenticada en localStorage
        localStorage.setItem('tienda', selectedTienda);
        
        // Redirigir a la página principal
        navigate('/main');
      } else {
        setError('Credenciales incorrectas. Intenta de nuevo.');
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <div>
        <label htmlFor="tienda">Selecciona una tienda:</label>
        <select
          id="tienda"
          value={selectedTienda}
          onChange={(e) => setSelectedTienda(e.target.value)}
          required
        >
          <option value="">--Selecciona una tienda--</option>
          {tiendas.map((tienda, index) => (
            <option key={index} value={tienda.nombre}>{tienda.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginButton onClick={handleLogin} />
    </form>
  );
};

export default LoginForm;

// src/hooks/useFetchTiendas.js

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Conectar con el servidor Socket.IO

const useFetchTiendas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Emitir el evento para solicitar las tiendas
    socket.emit('getTiendas');

    // Escuchar la respuesta con las tiendas
    socket.on('tiendasData', (data) => {
      setTiendas(data);
      setLoading(false);
    });

    // Manejar errores
    socket.on('error', (message) => {
      setError(message);
      setLoading(false);
    });

    // Limpiar los eventos cuando el componente se desmonte
    return () => {
      socket.off('tiendasData');
      socket.off('error');
    };
  }, []);

  return { tiendas, loading, error };
};

export default useFetchTiendas;

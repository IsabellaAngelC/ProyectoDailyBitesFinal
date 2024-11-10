// src/components/Notificaciones.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Conectar al servidor Socket.IO
const socket = io('http://localhost:3001');

const Notificaciones = ({ tiendaNombre, onNotificacionesClick }) => {
  const [notificaciones, setNotificaciones] = useState(0);

  useEffect(() => {
    const handleNuevoPedido = (pedido) => {
      // Aumentar el contador solo si el pedido es para la tienda autenticada
      if (pedido.tienda.nombre === tiendaNombre) {
        setNotificaciones((prev) => Math.min(prev + 1, 20)); // Máximo de 20
      }
    };

    // Escuchar el evento de nuevo pedido
    socket.on('nuevoPedido', handleNuevoPedido);

    // Limpiar el evento al desmontar
    return () => {
      socket.off('nuevoPedido', handleNuevoPedido);
    };
  }, [tiendaNombre]);

  return (
    <div onClick={onNotificacionesClick} style={{ cursor: 'pointer' }}>
      <h2>
        Notificaciones: {notificaciones > 0 ? (notificaciones > 20 ? '+20' : notificaciones) : 0}
      </h2>
    </div>
  );
};

export default Notificaciones;

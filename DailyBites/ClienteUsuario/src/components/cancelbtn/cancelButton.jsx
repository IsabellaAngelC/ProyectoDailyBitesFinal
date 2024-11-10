import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Conectamos con el servidor Socket.IO

const CancelButton = ({ codigoPedido, navigate }) => {
  const handleCancel = () => {
    // Emitir el evento para cancelar el pedido en el servidor
    socket.emit('cancelPedido', { codigoPedido });

    // Escuchar la respuesta del servidor
    socket.on('cancelSuccess', (response) => {
      alert(response.message);

      // Limpiar sessionStorage
      sessionStorage.removeItem('codigoPedido');
      sessionStorage.removeItem('tienda');

      // Redirigir al usuario a la pantalla principal
      navigate('/main');
    });

    socket.on('cancelError', (error) => {
      alert(`Error al cancelar el pedido: ${error.message}`);
    });
  };

  return <button onClick={handleCancel}>Cancelar Pedido</button>;
};

export default CancelButton;

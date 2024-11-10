import React from 'react';
import io from 'socket.io-client';

const ConfirmButton = ({ navigate, pedido }) => {
  const handleConfirm = () => {
    const socket = io('http://localhost:3001');

    if (!pedido) {
      alert('No hay pedido disponible para confirmar.');
      return;
    }

    // Emitir el evento para confirmar el pedido mediante Socket.IO
    socket.emit('confirmarPedido', pedido); // Enviar el pedido completo al socket

    alert('Pedido confirmado y enviado a la tienda.');

    // Desconectar el socket cuando se complete
    socket.disconnect();

    // Navegar a la página principal u otra página después de confirmar
    navigate('/');
  };

  return <button onClick={handleConfirm}>Confirmar Pedido</button>;
};

export default ConfirmButton;

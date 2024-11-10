import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Conectar con el servidor Socket.IO

const ReserveButton = ({ formData, menu, quantity, tienda }) => {
    const handleReserve = () => {
        // Generar un código aleatorio para el pedido
        const codigoPedido = Math.random().toString(36).substring(2, 10).toUpperCase();
      
        // Calcular el total a pagar (precio * cantidad)
        const totalAPagar = menu.precio * quantity;
      
        const pedido = {
          codigoPedido,
          nombreCliente: formData.nombre,
          correoCliente: formData.correo,
          horaEntrega: formData.horaEntrega,
          metodoPago: formData.metodoPago,
          cantidad: quantity,
          totalAPagar,
          menu: {
            nombre: menu.nombre,
            precio: menu.precio,
            etiqueta: menu.etiqueta,
            descripcion: menu.descripcion,
          },
          tienda: {
            nombre: tienda.nombre,
          },
        };
      
        // Guardar el código del pedido, la tienda y el pedido en sessionStorage
        sessionStorage.setItem('codigoPedido', codigoPedido);
        sessionStorage.setItem('tienda', JSON.stringify(tienda));
        sessionStorage.setItem('pedido', JSON.stringify(pedido)); // Guardamos el pedido
      
        // Emitir el evento para crear un nuevo pedido
        socket.emit('newPedido', pedido);
      
        // Escuchar respuesta del servidor
        socket.on('pedidoSuccess', (response) => {
          alert(response.message + ` Total a pagar: $${totalAPagar}`);
          // Redirigir a la página de delivery
          window.location.href = '/delivery';
        });
      
        socket.on('pedidoError', (error) => {
          alert(error.message);
        });
      };
      

  return <button onClick={handleReserve}>Reservar</button>;
};

export default ReserveButton;

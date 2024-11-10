import React from 'react';

const PedidoCard = ({ pedido }) => {
  return (
    <div className="pedido-card">
      <h3>Código de Pedido: {pedido.codigoPedido}</h3>
      <p>Hora de Entrega: {pedido.horaEntrega}</p>
      <p>Método de Pago: {pedido.metodoPago}</p>
      {/* Verificar si el menú está definido antes de acceder a sus propiedades */}
      {pedido.menu ? (
        <>
          <p>Nombre del Menú: {pedido.menu.nombre}</p>
          <p>Cantidad: {pedido.cantidad}</p>
          <p>Total a Pagar: ${pedido.totalAPagar}</p>
        </>
      ) : (
        <p>Detalles del menú no disponibles</p>
      )}
    </div>
  );
};

export default PedidoCard;

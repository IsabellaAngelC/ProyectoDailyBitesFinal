const Factura = ({ pedido, tienda }) => {
    if (!pedido || !tienda) {
      return <p>Cargando...</p>; // O un mensaje más adecuado
    }
  
    return (
      <div>
        <p><strong>Nombre del Cliente:</strong> {pedido.nombreCliente}</p>
        <p><strong>Hora de Entrega:</strong> {pedido.horaEntrega}</p>
        <p><strong>Método de Pago:</strong> {pedido.metodoPago}</p>
        <p><strong>Nombre de la Tienda:</strong> {tienda.nombre}</p>
        <p><strong>Nombre del Menú:</strong> {pedido.menu.nombre}</p>
        <p><strong>Total a Pagar:</strong> ${pedido.totalAPagar}</p>
      </div>
    );
  };

export default Factura;
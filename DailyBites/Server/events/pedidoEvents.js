const fs = require('fs');
const pedidosPath = './db/pedidos.json'; // Ruta al archivo de pedidos

module.exports = (socket) => {
  // Manejar la creación de un nuevo pedido
  socket.on('newPedido', (pedido) => {
    // Leer los pedidos actuales
    let pedidos = JSON.parse(fs.readFileSync(pedidosPath, 'utf-8'));

    // Añadir el nuevo pedido
    pedidos.push(pedido);

    // Guardar los pedidos actualizados
    fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2));

    socket.emit('pedidoSuccess', { message: 'Pedido creado con éxito' });
  });

  // Manejar la cancelación de un pedido
  socket.on('cancelPedido', ({ codigoPedido }) => {
    // Leer los pedidos actuales
    let pedidos = JSON.parse(fs.readFileSync(pedidosPath, 'utf-8'));

    // Filtrar el pedido por el código
    const pedidosActualizados = pedidos.filter(pedido => pedido.codigoPedido !== codigoPedido);

    // Guardar los pedidos actualizados
    fs.writeFileSync(pedidosPath, JSON.stringify(pedidosActualizados, null, 2));

    socket.emit('cancelSuccess', { message: 'Pedido cancelado con éxito' });
  });
};

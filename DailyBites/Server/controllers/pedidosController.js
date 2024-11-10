const fs = require('fs');

let io; // Declaramos la variable para Socket.IO

const setIo = (socketIo) => {
  io = socketIo; // Inicializamos la variable io
};

const createPedido = (req, res) => {
  const nuevoPedido = req.body;
  let pedidos = [];

  try {
    pedidos = JSON.parse(fs.readFileSync('./db/pedidos.json', 'utf-8'));
  } catch (err) {
    pedidos = [];
  }

  pedidos.push(nuevoPedido);
  fs.writeFileSync('./db/pedidos.json', JSON.stringify(pedidos, null, 2));

  // Emitir el nuevo pedido a través de Socket.IO
  if (io) {
    io.emit('nuevoPedido', nuevoPedido); // Emitir el evento nuevoPedido
  }

  res.status(201).json({ message: 'Pedido creado con éxito' });
};

module.exports = { createPedido, setIo };

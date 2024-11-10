const fs = require('fs');

module.exports = (socket) => {
  // Manejar la solicitud de obtener tiendas
  socket.on('getTiendas', () => {
    try {
      const tiendas = JSON.parse(fs.readFileSync('./db/tiendas.json', 'utf-8'));
      socket.emit('tiendasData', tiendas); // Enviar las tiendas al cliente
    } catch (error) {
      console.error('Error al leer tiendas:', error);
      socket.emit('error', 'No se pudieron obtener las tiendas');
    }
  });
};

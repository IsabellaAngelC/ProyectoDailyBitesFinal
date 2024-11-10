// events/authEvents.js
const { authenticateUser } = require('../controllers/authController');

const authEvents = (socket) => {
  socket.on('login', (data) => {
    authenticateUser(data)
      .then(result => {
        // Emitir la respuesta al cliente a través del socket
        socket.emit('loginResponse', result);
      })
      .catch(error => {
        socket.emit('loginResponse', { success: false, error: error.message });
      });
  });
};

module.exports = authEvents;

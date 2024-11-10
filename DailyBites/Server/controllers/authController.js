// controllers/authController.js
const fs = require('fs');

const authenticateUser = (data) => {
  const { tienda, password } = data;

  return new Promise((resolve, reject) => {
    // Leer el archivo users.json
    fs.readFile('./db/users.json', 'utf-8', (err, fileData) => {
      if (err) {
        return reject(new Error('Error del servidor'));
      }

      const users = JSON.parse(fileData);
      const user = users.find(u => u.tienda === tienda && u.password === password);

      if (user) {
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    });
  });
};

module.exports = { authenticateUser };

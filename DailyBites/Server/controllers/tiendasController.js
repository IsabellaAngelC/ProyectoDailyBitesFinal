const fs = require('fs');
const path = require('path');

// Controlador para obtener las tiendas (usado en la ruta HTTP)
const getTiendas = (req, res) => {
  try {
    const tiendas = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/tiendas.json'), 'utf-8'));
    res.json(tiendas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tiendas' });
  }
};

module.exports = { getTiendas };

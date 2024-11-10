const express = require('express');
const fs = require('fs');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');
const multer = require('multer');
const tiendaEvents = require('./events/tiendaEvents');
const pedidoEvents = require('./events/pedidoEvents');
const authEvents = require('./events/authEvents'); // Importar authEvents

// Inicialización del servidor Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json()); // Para parsear JSON
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // Para servir archivos estáticos

// Función para asegurarse de que el directorio existe
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configuración de multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guardar todas las imágenes en la misma carpeta
    const dir = path.join(__dirname, 'assets/fotos_menu');
    ensureDirectoryExists(dir); // Asegurarse de que el directorio exista
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Usar un nombre único para cada archivo
    cb(null, Date.now() + '-' + file.originalname); // Guardar con un nombre único
  }
});

const upload = multer({ storage });

// Rutas para tiendas
app.get('/tiendas', (req, res) => {
  const tiendas = JSON.parse(fs.readFileSync('./db/tiendas.json', 'utf-8'));
  res.json(tiendas);
});

// Ruta para obtener los pedidos
app.get('/pedidos', (req, res) => {
  try {
    const pedidos = JSON.parse(fs.readFileSync('./db/pedidos.json', 'utf-8'));
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar los pedidos' });
  }
});

// Ruta para autenticación de usuarios (si fuera por HTTP)
app.post('/login', (req, res) => {
  res.status(405).json({ message: 'Usar Socket.IO para login' });
});

// Ruta para crear pedidos
app.post('/pedidos', (req, res) => {
  const nuevoPedido = req.body;
  let pedidos = [];

  try {
    pedidos = JSON.parse(fs.readFileSync('./db/pedidos.json', 'utf-8'));
  } catch (err) {
    pedidos = [];
  }

  pedidos.push(nuevoPedido);
  fs.writeFileSync('./db/pedidos.json', JSON.stringify(pedidos, null, 2));

  // Emitir notificación de nuevo pedido a todos los empleados conectados
  io.emit('nuevoPedido', nuevoPedido);

  res.status(201).json({ message: 'Pedido creado con éxito' });
});

// Ruta para subir la imagen
app.post('/upload', upload.single('imagen'), (req, res) => {
  // Verificamos que el archivo fue subido
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ninguna imagen.' });
  }

  // Generamos la ruta única para la imagen
  const filePath = `/assets/fotos_menu/${req.file.filename}`;
  res.json({ imageUrl: filePath });
});

// Ruta para añadir un nuevo menú a una tienda en tiendas.json
app.post('/tiendas/addmenu', (req, res) => {
  const { tienda, menu } = req.body;

  const tiendasPath = './db/tiendas.json';
  fs.readFile(tiendasPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo de tiendas' });
    }

    const tiendas = JSON.parse(data);
    const tiendaData = tiendas.find(t => t.nombre === tienda);

    if (!tiendaData) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    // Añadir el nuevo menú
    tiendaData.menus.push(menu);

    // Guardar de nuevo en tiendas.json
    fs.writeFile(tiendasPath, JSON.stringify(tiendas, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al guardar el menú' });
      }
      res.status(200).json({ message: 'Menú añadido con éxito' });
    });
  });
});

// Configuración de eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Manejo de eventos de tienda
  tiendaEvents(socket);

  // Manejo de eventos de pedidos
  pedidoEvents(socket);

  // Manejo de autenticación de usuarios
  authEvents(socket); 

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Iniciar servidor en el puerto 3001
server.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});

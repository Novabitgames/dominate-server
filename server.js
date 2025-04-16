const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Esto permite leer datos en formato JSON
app.use(express.json());

const salas = {};  // Almacenamos las salas y los jugadores por ID

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Nueva ruta para crear partida
app.post('/partida', (req, res) => {
  const partida = {
    id: Date.now(),  // ID único
    mensaje: '¡Partida creada con éxito!'
  };

  salas[partida.id] = { jugadores: [] };  // Inicializamos la sala
  res.json(partida);  // Respondemos con un JSON
});

// Ruta para unirse a partida
app.get('/partida/:id', (req, res) => {
  const partidaId = req.params.id;
  if (salas[partidaId]) {
    res.status(200).json({ mensaje: "Partida encontrada" });
  } else {
    res.status(404).json({ mensaje: "Partida no encontrada" });
  }
});

// WebSocket para manejar conexiones de jugadores en salas
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
  const partidaId = req.url.split('/')[2];
  
  if (!salas[partidaId]) {
    ws.close();
    return;
  }

  salas[partidaId].jugadores.push(ws);

  // Enviar lista de jugadores a todos los clientes conectados
  const jugadores = salas[partidaId].jugadores.map((s) => s.nombre || 'Jugador');
  salas[partidaId].jugadores.forEach((s) => {
    s.send(JSON.stringify({ jugadores }));
  });

  ws.on('message', (message

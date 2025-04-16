const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Esto permite leer datos en formato JSON
app.use(express.json());

let salas = {};

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Ruta para crear una partida
app.post('/partida', (req, res) => {
  const partidaId = Date.now();
  const partida = {
    id: partidaId,
    jugadores: []
  };

  salas[partidaId] = partida;
  res.json({ id: partidaId, mensaje: '¡Partida creada con éxito!' });
});

// Escuchar conexiones de WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo jugador conectado');

  socket.on('unirseSala', (partidaId, nombre) => {
    if (salas[partidaId]) {
      const sala = salas[partidaId];
      if (!sala.jugadores.includes(nombre)) {
        sala.jugadores.push(nombre);
        socket.join(partidaId);
        io.to(partidaId).emit('actualizarJugadores', sala.jugadores);
      }
    } else {
      socket.emit('error', 'ID de partida no válido');
    }
  });

  socket.on('salirSala', (partidaId, nombre) => {
    const sala = salas[partidaId];
    if (sala) {
      const index = sala.jugadores.indexOf(nombre);
      if (index !== -1) {
        sala.jugadores.splice(index, 1);
        io.to(partidaId).emit('actualizarJugadores', sala.jugadores);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Jugador desconectado');
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

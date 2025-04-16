const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new Server({ server });

const salas = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.tipo === 'unirse') {
      const { idSala, nombre } = data;
      if (!salas[idSala]) {
        salas[idSala] = [];
      }
      salas[idSala].push({ nombre, ws });
      actualizarSala(idSala);
    } else if (data.tipo === 'salir') {
      const { idSala, nombre } = data;
      if (salas[idSala]) {
        salas[idSala] = salas[idSala].filter(j => j.nombre !== nombre);
        actualizarSala(idSala);
      }
    }
  });

  ws.on('close', () => {
    for (const idSala in salas) {
      salas[idSala] = salas[idSala].filter(j => j.ws !== ws);
      actualizarSala(idSala);
    }
  });
});

function actualizarSala(idSala) {
  if (!salas[idSala]) return;
  const nombres = salas[idSala].map(j => j.nombre);
  salas[idSala].forEach(j => {
    j.ws.send(JSON.stringify({ tipo: 'actualizar', jugadores: nombres }));
  });
}

app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

app.post('/partida', (req, res) => {
  const partidaId = Date.now().toString();
  salas[partidaId] = [];
  res.json({ id: partidaId, mensaje: '¡Partida creada con éxito!' });
});

app.post('/unirse', (req, res) => {
  const { idSala } = req.body;
  if (!salas[idSala]) {
    return res.status(404).json({ error: 'ID de sala no válido' });
  }
  res.json({ mensaje: 'Unido con éxito a la partida' });
});

// ⬇️ Este es el final correcto ⬇️
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

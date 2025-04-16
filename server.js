
const express = require('express');
const cors = require('cors');  
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());  

// Esto permite leer datos en formato JSON
app.use(express.json());

let partidas = {}

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Nueva ruta para crear partida
app.post('/partida', (req, res) => {
  const partidaId = Date.now();
  partidas[partidaId] = { id: partidaId, jugadores: [req.body.nombre] };
  res.json({ id: partidaId, mensaje: '¡Partida creada con éxito!' });
});

// Ruta para unirse a una partida
app.get('/partida/:id', (req, res) => {
  const partida = partidas[req.params.id];
  if (!partida) {
    return res.status(404).json({ mensaje: 'Partida no encontrada.' });
  }
  res.json(partida);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

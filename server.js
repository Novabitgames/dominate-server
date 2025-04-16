const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite leer datos en formato JSON
app.use(express.json());

// Habilitar CORS para permitir solicitudes de diferentes orígenes
app.use(cors());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Nueva ruta para crear partida
app.post('/partida', (req, res) => {
  // Aquí puedes generar un código de partida o lo que quieras
  const partida = {
    id: Date.now(), // ID único
    mensaje: '¡Partida creada con éxito!'
  };

  res.json(partida);
});

// Nueva ruta para unirse a una partida
app.post('/unirse', (req, res) => {
  const { partidaId, nombre } = req.body;
  // Aquí puedes verificar si la partida existe y unirte a ella
  if (!partidaId || !nombre) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  res.json({
    mensaje: `¡Hola ${nombre}! Te has unido a la partida con ID: ${partidaId}`
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

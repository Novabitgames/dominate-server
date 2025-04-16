const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

app.post('/partida', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'Falta el nombre del jugador' });
  }

  const partida = {
    id: Date.now(),
    nombre,
    mensaje: '¡Partida creada con éxito!'
  };

  res.json(partida);
});

app.post('/unirse', (req, res) => {
  const { nombre, id } = req.body;

  if (!nombre || !id) {
    return res.status(400).json({ error: 'Faltan datos para unirse' });
  }

  res.json({
    mensaje: `¡${nombre} se ha unido a la partida ${id}!`
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

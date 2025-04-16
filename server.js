const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const partidas = {}; // Guardará las partidas y sus jugadores

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Crear una nueva partida
app.post('/partida', (req, res) => {
  const { nombre } = req.body;

  const id = Date.now(); // ID único
  partidas[id] = [nombre]; // Guardamos al jugador como primer miembro

  res.json({ id, mensaje: `Partida creada con éxito por ${nombre}` });
});

// Unirse a una partida existente
app.post('/unirse', (req, res) => {
  const { nombre, id } = req.body;

  if (!partidas[id]) {
    return res.status(404).json({ error: 'Partida no encontrada' });
  }

  partidas[id].push(nombre); // Agregamos al jugador a la partida
  res.json({ mensaje: `${nombre} se unió a la partida ${id}` });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let partidas = {}; // Guardaremos partidas simples en memoria

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Ruta para crear una partida
app.post('/partida', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'Nombre requerido' });
  }

  const id = Date.now(); // ID único

  partidas[id] = {
    creador: nombre,
    jugadores: [nombre]
  };

  res.json({ id, mensaje: '¡Partida creada con éxito!' });
});

// Ruta para unirse a una partida
app.post('/unirse', (req, res) => {
  const { nombre, id } = req.body;

  if (!nombre || !id) {
    return res.status(400).json({ error: 'Nombre e ID requeridos' });
  }

  if (!partidas[id]) {
    return res.status(404).json({ error: 'Partida no encontrada' });
  }

  // Evitar duplicados
  if (!partidas[id].jugadores.includes(nombre)) {
    partidas[id].jugadores.push(nombre);
  }

  res.json({ mensaje: `Jugador ${nombre} unido a la partida ${id}` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

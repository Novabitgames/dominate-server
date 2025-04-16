const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite leer datos en formato JSON
app.use(express.json());

let partidas = [];  // Arreglo para almacenar las partidas

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Ruta para crear partida
app.post('/partida', (req, res) => {
  const { nombre } = req.body;
  const partida = {
    id: Date.now(),  // ID único
    mensaje: '¡Partida creada con éxito!',
    jugadores: [{ nombre }]  // Agregar al primer jugador
  };

  partidas.push(partida);  // Almacenar la partida
  res.json(partida);
});

// Ruta para unirse a partida
app.post('/partida/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  // Buscar la partida por ID
  const partida = partidas.find(p => p.id === parseInt(id));

  if (partida) {
    partida.jugadores.push({ nombre });
    res.json({ mensaje: `Te has unido a la partida con ID: ${id}` });
  } else {
    res.status(404).json({ mensaje: 'Partida no encontrada' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

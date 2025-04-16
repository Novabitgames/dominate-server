const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite leer datos en formato JSON
app.use(express.json());

let partidas = []; // Guardamos las partidas en memoria

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Crear partida
app.post('/partida', (req, res) => {
  const partida = {
    id: Date.now(),
    nombre: req.body.nombre,
    jugadores: [req.body.nombre]
  };
  partidas.push(partida); // Guardar la partida
  res.json(partida);
});

// Unirse a partida
app.post('/partida/:id', (req, res) => {
  const partidaId = req.params.id;
  const partida = partidas.find(p => p.id == partidaId);

  if (!partida) {
    return res.status(404).json({ error: "Partida no encontrada" });
  }

  partida.jugadores.push(req.body.nombre); // Agregar el jugador a la partida
  res.json({ mensaje: `Te has unido a la partida ${partidaId}`, jugadores: partida.jugadores });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

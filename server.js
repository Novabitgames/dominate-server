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
  const nombre = req.body.nombre;
  
  if (!nombre) {
    return res.status(400).json({ error: "El nombre del jugador es obligatorio" });
  }

  const partida = {
    id: Date.now(), // Generamos un ID único
    nombre: nombre,
    jugadores: [nombre] // Al principio, solo está el jugador que crea la partida
  };

  partidas.push(partida); // Guardar la partida en la memoria
  res.json(partida); // Devolvemos los detalles de la partida creada
});

// Unirse a partida
app.post('/partida/:id', (req, res) => {
  const partidaId = req.params.id;
  const partida = partidas.find(p => p.id == partidaId);

  if (!partida) {
    return res.status(404).json({ error: "Partida no encontrada" });
  }

  const nombre = req.body.nombre;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre del jugador es obligatorio" });
  }

  partida.jugadores.push(nombre); // Agregar el jugador a la partida
  res.json({ mensaje: `Te has unido a la partida ${partidaId}`, jugadores: partida.jugadores });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const express = require('express');
const cors = require('cors'); // <-- añadimos cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // <-- habilitamos CORS
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Ruta para crear partida
app.post('/partida', (req, res) => {
  const nombre = req.body.nombre || 'Jugador';
  const partida = {
    id: Date.now(),
    jugador: nombre,
    mensaje: `¡Partida creada por ${nombre}!`
  };

  res.json(partida);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

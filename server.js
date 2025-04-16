const express = require('express');
const cors = require('cors');  // Importamos el paquete cors
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());  // Esto permite solicitudes desde cualquier dominio

// Esto permite leer datos en formato JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Nueva ruta para crear partida
app.post('/partida', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del jugador es obligatorio.' });
  }

  const partida = {
    id: Date.now(), // ID único
    jugador: nombre,
    mensaje: `¡Partida creada por ${nombre}!`
  };

  res.json(partida);
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

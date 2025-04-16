const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite leer datos en formato JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Nueva ruta para crear partida
app.post('/partida', (req, res) => {
  // Aquí podrías generar un código de partida o lo que quieras
  const partida = {
    id: Date.now(), // ID único
    mensaje: '¡Partida creada con éxito!'
  };

  res.json(partida);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

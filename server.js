const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite leer datos en formato JSON
app.use(express.json());
app.use(cors()); // Habilitamos CORS

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Nueva ruta para crear partida
app.post('/partida', (req, res) => {
  const { nombre } = req.body;  // Recibimos el nombre del jugador desde la solicitud

  // Validamos si el nombre está presente
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio.' });
  }

  // Crear una nueva partida
  const partida = {
    id: Date.now(), // ID único basado en el tiempo
    nombre: nombre, // Nombre del jugador
    mensaje: `¡Partida creada con éxito para ${nombre}!`
  };

  // Enviar la respuesta con los datos de la partida
  res.json(partida);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

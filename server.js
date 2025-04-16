const express = require('express');
const cors = require('cors'); // Importar cors
const app = express();
const PORT = process.env.PORT || 3000;  // Esto permite que se use el puerto asignado por Render

app.use(cors()); // Activar CORS
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor de Dominate funcionando correctamente!');
});

// Crear partida
app.post('/partida', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'Nombre es requerido' });
  }

  const partida = {
    id: Date.now(),
    nombre,
    mensaje: '¡Partida creada con éxito!'
  };

  res.json(partida);
});

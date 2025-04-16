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
  const partida = {
    id: Date.now(),  // ID único
    mensaje: '¡Partida creada con éxito!'
  };

  res.json(partida);  // Respondemos con un JSON
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

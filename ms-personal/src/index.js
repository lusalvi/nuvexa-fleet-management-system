require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/conductores', require('./routes/conductores.routes'));
app.use('/api/pasajeros', require('./routes/pasajeros.routes'));

// Ruta de verificación
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor ms-personal corriendo en puerto ${PORT}`);
});

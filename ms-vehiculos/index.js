require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/vehiculos', require('./routes/vehiculos.routes'));

// Ruta de verificación
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor ms-vehiculos corriendo en puerto ${PORT}`);
});

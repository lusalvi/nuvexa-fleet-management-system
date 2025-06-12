const express = require('express');
const router = express.Router();
const { obtenerPasajeros } = require('../services/pasajeros.service');

router.get('/', async (req, res) => {
  try {
    const pasajeros = await obtenerPasajeros();
    res.json(pasajeros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

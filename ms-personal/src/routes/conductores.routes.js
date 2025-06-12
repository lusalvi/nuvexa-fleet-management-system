const express = require('express');
const router = express.Router();
const { obtenerConductores } = require('../services/conductores.service');

router.get('/', async (req, res) => {
  try {
    const conductores = await obtenerConductores();
    res.json(conductores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

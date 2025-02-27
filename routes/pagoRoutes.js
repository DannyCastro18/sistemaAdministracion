const express = require('express');
const router = express.Router();

const pagoController = require('../controller/pagoController');

router.get('/obtener', pagoController.obtenerPagos);
router.post('/registrar', pagoController.registrarPago);
router.put('/editar/:id', pagoController.editarPago);

module.exports = router;
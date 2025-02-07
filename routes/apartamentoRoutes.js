const express = require('express');
const router = express.Router();

const apartamentoController = require('../controller/apartamentoController');

router.get('/ver', apartamentoController.verApartamentos);
router.post('/registrar', apartamentoController.registrarApartamento);
router.put('/asignar', apartamentoController.asignarApartamento )

module.exports = router;
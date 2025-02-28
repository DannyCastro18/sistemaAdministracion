const express = require('express');
const router = express.Router();

const apartamentoController = require('../controller/apartamentoController');

router.get('/ver', apartamentoController.verApartamentos);
router.post('/registrar', apartamentoController.registrarApartamento);
router.put('/asignar', apartamentoController.asignarApartamento )
router.put('/actualizar/:id', apartamentoController.editarApartamento);

module.exports = router;
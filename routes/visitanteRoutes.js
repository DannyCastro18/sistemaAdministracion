const express = require('express');
const router = express.Router();

const visitanteController = require('../controller/visitanteController');

router.get('/ver', visitanteController.verVisitantes);
router.post('/registrar', visitanteController.registrarVisitante);
router.put('/actualizar/:id', visitanteController.actualizarVisitante);

module.exports = router;
const express = require('express');
const router = express.Router();

const propietarioController = require('../controller/propietarioController');

router.get('/ver', propietarioController.verPropietarios);
router.post('/registrar', propietarioController.registrarPropietario);
router.put('/actualizar/:id', propietarioController.actualizarPropietario);
router.delete('/eliminar/:id', propietarioController.eliminarPropietario);

module.exports = router;
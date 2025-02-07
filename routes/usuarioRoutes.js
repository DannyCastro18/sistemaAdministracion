const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

router.get('/ver', usuarioController.verUsuarios);
router.post('/registrar', usuarioController.registrarUsuario);
router.put('/actualizar/:id', usuarioController.actualizarUsuario);
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;
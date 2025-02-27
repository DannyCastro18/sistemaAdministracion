const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuarioController');
const { inicioSesion } = require("../controller/inicioSesionController");

router.get('/ver', usuarioController.verUsuarios);
router.post('/registrar', usuarioController.registrarUsuario);
router.put('/actualizar/:id', usuarioController.actualizarUsuario);
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);
router.post("/inicioSesion", inicioSesion);

module.exports = router;
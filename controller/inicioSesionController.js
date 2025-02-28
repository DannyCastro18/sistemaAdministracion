const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
require("dotenv").config();

exports.inicioSesion = async (req, res) => {
    
    try {
        const { correo, contraseña } = req.body;
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (usuario.password !== contraseña) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.json({ message: "Inicio de sesión exitoso", token, usuario });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el inicio de sesión" });
    }
};

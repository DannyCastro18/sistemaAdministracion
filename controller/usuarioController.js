const Usuario = require('../models/usuario');

const verUsuarios = async (req,res) => {
    try{
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    }catch(error){
        console.error(error);
        res.status(500).json({Mensaje: 'Error al obtener los usuarios'});
    }
};

const registrarUsuario = async (req,res) => {
    try{
        const newUser = await Usuario.create(req.body);
        res.status(201).json(newUser);
    } catch(error){
        res.status(400).json({ Mensaje: 'Error al crear el usuario'});
    }
};

const actualizarUsuario = async (req,res) => {
    try{
        const {id} = req.params;
        const usuarioActualizado = await Usuario.update(req.body,{ where: {id}});
        if (usuarioActualizado[0] === 0){
            return res.status(404).json({Mensaje: 'Usuario no encontrado'});
        }
        res.json({Mensaje: 'Usuario actualizado correctamente'});
    }catch(error){
        res.status(400).json({Mensaje: 'Error al actualizar el usuario'});
    }
};

const eliminarUsuario = async (req,res) => {
    try{
        const {id} = req.params;
        const resultado = await Usuario.destroy({ where: {id}});
        if(!resultado){
            return res.status(404).json({Mensaje: 'Usuario no encontrado'});
        }
        res.json({Mensaje: 'Usuario eliminado'});
    }catch(error){
        res.status(500).json({Mensaje: 'Error al eliminar el usuario' , error: error.message});
    }
};

module.exports = {verUsuarios,registrarUsuario,actualizarUsuario,eliminarUsuario};
const Usuario = require('../models/usuario');
const Visitante = require('../models/visitante');
const Apartamento = require('../models/apartamento');

//quiero ver los visitantes por id o todos los visitantes? se puede hacer un get para ver todos los visitantes y otro para ver por id, en los requerimientos dice que se debe hacer un flitro por fecha
const verVisitantes = async (req,res) => {
    try{
        const visitantes = await Visitante.findAll();
        res.json(visitantes);
    }catch(error){
        console.error(error);
        res.status(500).json({Mensaje: 'Error al obtener los visitantes'});
    }
}

//necesito registrar tanto la entrada como la salida de un visitante, aunque este paso lo completaria la base de datos porque tiene todos los campos necesarios para hacerlo
const registrarVisitante = async (req,res) => {
    try{
        const {nombre, fechaHoraEntrada, apartamento_id, guardia_id } = req.body;

        const apartamento = await Apartamento.findByPk(apartamento_id);
        if (!apartamento) {
            return res.status(404).json({Mensaje: 'Apartamento no encontrado'});
        }
        const guardia  = await Usuario.findOne({where: {id: guardia_id, rol: 'guardia'}});
        if (!guardia) {
            return res.status(404).json({Mensaje: 'Guardia no encontrado'});
        }
        if(guardia.estado !== 'activo'){
            return res.status(400).json({Mensaje: 'El guardia no se encuentra activo'});
        }

        const newVisitante = await Visitante.create({nombre, fechaHoraEntrada, apartamento_id, guardia_id});

        res.status(201).json(newVisitante);

    }catch(error){
        res.status(400).json({Mensaje: 'Error al registrar el visitante' , error: error.message});
    }
};
//revisar
const actualizarVisitante = async (req,res) => {
    try{
        const {id} = req.params;
        const visitante = await Visitante.findByPk(id);
        if(!visitante){
            return res.status(404).json({Mensaje: 'Visitante no encontrado'});
        }
        await visitante.update(req.body);
        res.json(visitante);
    }catch(error){
        res.status(400).json({Mensaje: 'Error al actualizar el visitante'});
    }
};

module.exports = {registrarVisitante,verVisitantes,actualizarVisitante};
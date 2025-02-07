const Propietario = require('../models/propietario');
const Pago = require('../models/pago');
const Apartamento = require('../models/apartamento');
const Usuario = require('../models/usuario');

const verPropietarios = async (req,res) => {
    try{
        const propietarios = await Propietario.findAll({
        include: [
            {
                model: Pago, 
                as: 'pagos', 
                attributes: ['id','monto','tipo'],
            },
            {
                model: Apartamento,
                as: 'apartamentos',
                attributes: ['id','numero'],
            },
        ],
    });
        res.status(200).json(propietarios);
    }catch(error){
        console.error(error.message);
        res.status(500).json({Mensaje: 'Error al obtener los propietarios', error});
    }
};

// const verPropietariosId = async (req,res) => {
//     try{
//         const propietario = await Propietario.findOne({
//             where: {id: req.params.id},
//             include: [
//                 {
//                     model: Pago,
//                     as: 'pagos',
//                     attributes: ['id','monto','tipo'],
//                 },
//                 {
//                     model: Apartamento,
//                     as: 'apartamentos',
//                     attributes: ['id','numero'],
//                 },
//             ],
//         });
//         if(!propietario){
//             return res.status(404).json({Mensaje: 'Propietario no encontrado'});
//         }
//         res.status(200).json(propietario);
//     }catch(error){
//         console.error(error.message);
//         res.status(500).json({Mensaje: 'Error al obtener el propietario', error});
//     }
// };

const registrarPropietario = async (req,res) => {
    try{

        const {admin_id} = req.body;

        const admin = await Usuario.findOne({where: {id: admin_id, rol: 'administrador'}});

        if (!admin) {
            return res.status(404).json({Mensaje: 'Administrador no encontrado'});
        }

        if(admin.estado !== 'activo'){
            return res.status(400).json({Mensaje: 'Administrador inactivo'});
        }

        const newPropietario = await Propietario.create(req.body);
        res.status(201).json(newPropietario);
    } catch(error){
        res.status(400).json({ Mensaje: 'Error al crear el propietario', error: error.message});
    }
};

const actualizarPropietario = async (req,res) => {  
    try{
        const {id} = req.params;
        const propietarioActualizado = await Propietario.update(req.body,{ where: {id}});
        if (propietarioActualizado[0] === 0){
            return res.status(404).json({Mensaje: 'Propietario no encontrado'});
        }
        res.json({Mensaje: 'Propietario actualizado correctamente'});
    }catch(error){
        res.status(400).json({Mensaje: 'Error al actualizar el propietario'});
    }
};

const eliminarPropietario = async (req,res) => {
    try{
        const {id} = req.params;
        const resultado = await Propietario.destroy({ where: {id}});
        if(!resultado){
            return res.status(404).json({Mensaje: 'Propietario no encontrado'});
        }
        res.json({Mensaje: 'Propietario eliminado'});
    }catch(error){
        res.status(500).json({Mensaje: 'Error al eliminar el propietario', error});
    }
};

module.exports = {verPropietarios,registrarPropietario,actualizarPropietario,eliminarPropietario};  
const Pago = require('../models/pago');


//quiero obtener los pagos por id o todos los pagos? se puede hacer un get para obtener todos los pagos y otro para obtener por id, revisar si en los requerimientos hay un filtro
const obtenerPagos = async (req,res) => {
    try{
        const pagos = await Pago.findAll();
        res.json(pagos);
    }catch(error){
        console.error(error);
        res.status(500).json({Mensaje: 'Error al obtener los pagos'});
    }
};

//tener en cuenta que si el monto es negativo se debe rechazar el pago
const registrarPago = async (req,res) => { 
    try{
        const {monto} = req.body;
        if (monto < 0){
            return res.status(400).json({Mensaje: 'El monto no puede ser negativo'});
        }
    
        const newPago = await Pago.create(req.body);
        res.status(201).json(newPago);
    } catch(error){
        return res.status(400).json({ Mensaje: 'Error al registrar el pago', error});
    }
};

module.exports = {registrarPago,obtenerPagos};
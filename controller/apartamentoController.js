const Apartamento = require('../models/apartamento');
const Propietario = require('../models/propietario');

const verApartamentos = async (req,res) => {
    try{
        const apartamento = await Apartamento.findAll();
        res.json(apartamento);
    }catch(error){
        console.error(error);
        res.status(500).json({Mensaje: 'Error al obtener los apartamentos de Villa del Sol'});
    }
};

const registrarApartamento = async (req,res) => {
    try{
        const {numero } = req.body;
    if (!numero){
        return res.status(400).json({Mensaje: 'El número del apartamento es requerido'});
    }
    const newapartamento = await Apartamento.create({numero});
    res.status(201).json({Mensaje: 'Apartamento registrado correctamente', apartamento: newapartamento});
    } catch (error){
        console.error(error);
        res.status(400).json({Mensaje: 'Error al registrar apartamento'});
    }
};


const asignarApartamento = async (req, res) => {
    try {
        const { propietario_id, numero } = req.body;

        // Verificar si el número de apartamento ya existe
        const apartamentoExistente = await Apartamento.findOne({ where: { numero } });
        if (apartamentoExistente) {
            return res.status(400).json({ Mensaje: 'El número de apartamento ya está en uso' });
        }

        // Buscar un apartamento disponible sin propietario
        const apartamento = await Apartamento.findOne({ where: { propietario_id: null } });

        if (!apartamento) {
            return res.status(404).json({ Mensaje: 'No hay apartamentos disponibles' });
        }

        // Verificar si el propietario existe
        const propietario = await Propietario.findByPk(propietario_id);
        if (!propietario) {
            return res.status(404).json({ Mensaje: 'Propietario no encontrado' });
        }

        // Actualizar el apartamento con el propietario y nuevo número
        await apartamento.update({ propietario_id, numero });

        res.status(200).json({
            Mensaje: 'Apartamento asignado y número actualizado correctamente',
            apartamento: {
                id: apartamento.id,
                numero: apartamento.numero,
                propietario_id: apartamento.propietario_id,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Mensaje: 'Error al asignar apartamento' });
    }
};


module.exports = {registrarApartamento, asignarApartamento,verApartamentos};
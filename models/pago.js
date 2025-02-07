const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Propietario = require('./propietario');

const Pago = sequelize.define('Pago',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    monto:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    tipo:{
        type: DataTypes.ENUM('multa','arriendo','servicios'),
        allowNull: false,
    },
    propietario_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Propietario,
            key: 'id',
        },
        onDelete: 'CASCADE',
        },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},  {
    tableName: 'pago',
    timestamps: false,
});

Propietario.hasMany(Pago, {foreignKey: 'propietario_id', as: 'pagos'});
Pago.belongsTo(Propietario, {foreignKey: 'propietario_id', as: 'pagos'});

module.exports = Pago;


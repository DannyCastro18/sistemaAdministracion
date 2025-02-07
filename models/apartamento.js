const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Propietario = require('./propietario');

const Apartamento = sequelize.define('Apartamento',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    numero:{
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    propietario_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: Propietario,
            key: 'id',
        },
        onDelete: 'set null',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
},{
    tableName: 'apartamento',
    timestamps: false,
});

Propietario.hasMany(Apartamento, {foreignKey:'propietario_id' , as: 'apartamentos'});

Apartamento.belongsTo(Propietario, {foreignKey:'propietario_id', as: 'apartamentos'});

module.exports = Apartamento;


const {Sequelize,DataTypes} = require('sequelize');
const config = require('../config/database');
const Usuario = require('./usuario');
const Apartamento = require('./apartamento');

const Visitante = config.define('Visitante',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    fechaHoraEntrada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaHoraSalida:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    apartamento_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Apartamento,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    guardia_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'id',
        },
        onDelete: 'RESTRICT', //Acomodar esto podria ser CASCADE
    },
},{
    tableName: 'visitante',
    timestamps: false,
});

Apartamento.hasMany(Visitante, {foreignKey: 'apartamento_id'});
Visitante.belongsTo(Apartamento, {foreignKey: 'apartamento_id'});

Usuario.hasMany(Visitante, {foreignKey: 'guardia_id'});
Visitante.belongsTo(Usuario, {foreignKey: 'guardia_id'});

module.exports = Visitante;
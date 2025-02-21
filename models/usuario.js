const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/database');


const Usuario = config.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },//agregar correo
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('administrador','guardia'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo','inactivo'),
        allowNull: false,
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },
    // updateAt: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // }
},{
    tableName:'usuario',
    timestamps: true
});

module.exports = Usuario;


const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const detalleOrden = db.define(
    "detalleorden", {
        idDetalle: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[0-9]+$/],
                    msg: "ID del tipo invalido."
                }
            }
        },
        precio: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        idProductos: {
            type: Sequelize.INTEGER,
            allowNull: false,
            
        },
        idOrden: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
    }, 
    {
        tableName: "detalleorden",
        timestamps: false,
    },
);

module.exports = detalleOrden;
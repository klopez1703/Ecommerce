const sequelize = require('sequelize');
const db = require('../config/db');
const Carrito = db.define(
    "detallecarrito", {
        idProducto: {
            type: sequelize.INTEGER,
            validate: {
                is: {
                    args: [/^[0-9]+$/],
                    msg: "ID del tipo invalido."
                }
            }
        },
        idusuario: {
            type: sequelize.INTEGER,
            validate: {
                is: {
                    args: [/^[0-9]+$/],
                    msg: "ID del tipo invalido."
                }
            }
        },
        cantidad: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la cantidad'
                }
            }
        },
        fecha:{
            type: sequelize.DATE,
        },
        idCarrito: {
            type: sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }, {
        tableName: "detallecarrito",
        timestamps: false,
    }
);

module.exports = Carrito;
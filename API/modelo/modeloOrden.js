const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Orden = db.define(
    "orden", {
        idOrden: {
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
        monto: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        direccionEnvio: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        correoOrden: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'El email necesita ser unico'
            },
            validate: {
                isEmail: {
                    msg: 'Email no valido'
                },
                notEmpty: {
                    msg: 'Ingrese un email'
                }
            }
        },
        fechaOrden: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: {
                msg: "El usuario debe ser unico."
            }
        },
        estadoOrden: {
            type: Sequelize.ENUM('en proceso', 'recibido'),
            allowNull: false
        },
        idusuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        impuesto: {
            type: Sequelize.ENUM('15%', '18%'),
            allowNull: false
        },
        descuento: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
    }, 
    {
        tableName: "orden",
        timestamps: false,
    },
);

module.exports = Orden;
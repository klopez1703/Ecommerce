const sequelize = require('sequelize');
const db = require('../config/db');
const Producto = db.define(
    "productos", {
        idProductos: {
            type: sequelize.INTEGER,
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
        nombre: {
            type: sequelize.STRING(45),
            allowNull: false,
        },
        precio: {
            type: sequelize.DECIMAL(10,2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Ingrese el precio"
                }
            }
        },
        descripcion: {
            type: sequelize.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Ingrese la descripcion del producto"
                }
            }
        },
        stock: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la cantidad'
                }
            }
        },
        imagen:{
            type: sequelize.STRING(250),
        },
        idCategoria: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        codProducto: {
            type: sequelize.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el codigo del producto'
                }
            }
        },
        estadoProducto: {
            type: sequelize.ENUM('Nuevo', 'Usado'),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el estado del producto'
                }
            }
        },
    }, {
        tableName: "productos",
        timestamps: false,
    }
);

module.exports = Producto;
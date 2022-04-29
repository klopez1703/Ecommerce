const sequelize = require('sequelize');
const db = require('../config/db');
const Categoria = db.define(
    "categoria", {
        idCategoria: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[0-9]+$/],
                    msg: "ID del tipo invalido."
                }
            },
        },
        nomCategoria: {
            type: sequelize.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el nombre'
                }
            }
        }
    }, {
        tableName: "categoria",
        timestamps: false,

    }
);

module.exports = Categoria;
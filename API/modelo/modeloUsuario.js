const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    "usuario", {
        idusuario: {
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
        nombre: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        correo: {
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
        username: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: {
                msg: "El usuario debe ser unico."
            }
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Ingrese la contraseña"
                }
            }
        },
        rolUsuario: {
            type: Sequelize.ENUM('admin', 'cliente'),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Ingrese el tipo de usuario"
                }
            }
        },
        estado: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: "Ingrese el estado [0 - 1]"
                }
            }
        },
        fechanacimiento: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la fecha'
                }
            }
        },
        genero: {
            type: Sequelize.ENUM('Femenino', 'Masculino'),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el Genero'
                }
            }
        },
    }, {
        tableName: "usuario",
        timestamps: false,
        hooks: {
            beforeCreate(usuario){
                const hash = bcrypt.hashSync(usuario.password, 10);
                usuario.password = hash;
            },
            beforeUpdate(usuario){
                const hash = bcrypt.hashSync(usuario.password, 10);
                usuario.password = hash;
            }
        },
    },
);
Usuario.prototype.verificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
}

module.exports = Usuario;
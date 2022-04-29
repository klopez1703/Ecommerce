const Orden = require('../modelo/modeloOrden');
const Usuario = require('../modelo/modeloUsuario');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.ListaOrden = async(req, res) => {
    try {
        const orden = await Orden.findAll();
        console.log(orden);
        //res.json(orden);
        //enviar a la vista
        res.render('orden',{
            data:orden
        });
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};


exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos")
    } else {
        const { monto, direccionEnvio, correoOrden, fechaOrden, estadoOrden, idusuario, subtotal, impuesto,descuento} = req.body;

        const usuario = await Usuario.findOne({
            where: {
                idusuario: idusuario
            }
        });
        if (!usuario) {
            res.send("El usuario no existe");
        } else {

                var nuevaorden = await Orden.create({
                    monto: monto,
                    direccionEnvio: direccionEnvio,
                    correoOrden: correoOrden,
                    fechaOrden: fechaOrden,
                    estadoOrden: estadoOrden,
                    idusuario: idusuario,
                    subtotal: subtotal,
                    impuesto: impuesto,
                    descuento: descuento,
                }).then((data) => {
                    console.log(data);
                    res.send("Registro Guardado");
                }).catch((error) => {
                    if (error) {
                        console.log(error);
                        res.send("Error al guardar los datos");
                    }
                });
            


        }

    }

};

exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { idOrden } = req.query;
    var mensaje = "";
    if (!idOrden) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarOrden = await Orden.findOne({
            where: {
                idOrden: idOrden,
            }
        });
        if (!buscarOrden) {
            mensaje = "El id no existe";
        } else {
            await Orden.destroy({
                where: {
                    idOrden: idOrden,
                }
            }).then((data) => {
                console.log(data);
                mensaje = "Orden Eliminado";
            }).catch((error) => {
                console.log(error);
                mensaje = "Error en el servidor";
            });
        }
    }
    res.send(mensaje);
};

exports.Actualizarquery = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { idOrden } = req.query;
        const {  monto, direccionEnvio,correoOrden, fechaOrden, estadoOrden, idusuario , subtotal, impuesto, descuento } = req.body;
        var mensaje = "";
        if (!idOrden) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            var buscarUsuario = await Orden.findOne({
                where: {
                    idOrden: idOrden,
                }
            });
            if (!buscarUsuario) {
                mensaje = "El id no existe";
            } 
            else {
                buscarUsuario.monto = monto;
                buscarUsuario.direccionEnvio = direccionEnvio;
                buscarUsuario.correoOrden = correoOrden;
                buscarUsuario.fechaOrden = fechaOrden;
                buscarUsuario.estadoOrden = estadoOrden;
                buscarUsuario.idusuario = idusuario;
                buscarUsuario.subtotal = subtotal;
                buscarUsuario.impuesto = impuesto;
                buscarUsuario.descuento = descuento;
                await buscarUsuario.save();
                mensaje = "Orden actualizado";
            }
        }
        res.send(mensaje);
    }
};
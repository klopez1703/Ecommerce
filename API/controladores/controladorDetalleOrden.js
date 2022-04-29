const Orden = require('../modelo/modeloOrden');
const detalleOrden = require('../modelo/modeloDetalleOrden');
const Producto = require('../modelo/modeloProducto');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.ListaDetalleOrden = async(req, res) => {
    try {
        const detalleorden = await detalleOrden.findAll();
        console.log(detalleorden);
        res.json(detalleorden);
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};

exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos")
    } else {
        const { precio, cantidad, idProductos,idOrden} = req.body;

        const producto = await Producto.findOne({
            where: {
                idProductos: idProductos
            }
        });
        const orden = await Orden.findOne({
            where: {
                idOrden: idOrden
            }
        });
        if (!producto) {
            res.send("El producto no existe");
        } else {

                var nuevaorden = await detalleOrden.create({
                    precio: precio,
                    cantidad: cantidad,
                    idProductos: idProductos,
                    idOrden: idOrden,
                    
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
    const { idDetalle } = req.query;
    var mensaje = "";
    if (!idDetalle) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarDetalleOrden = await detalleOrden.findOne({
            where: {
                idDetalle: idDetalle,
            }
        });
        if (!buscarDetalleOrden) {
            mensaje = "El id no existe";
        } else {
            await detalleOrden.destroy({
                where: {
                    idDetalle: idDetalle,
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
        const { idDetalle } = req.query;
        const {  precio, cantidad,idProductos, idOrden} = req.body;
        var mensaje = "";
        if (!idDetalle) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            var buscarDetalle = await detalleOrden.findOne({
                where: {
                    idDetalle: idDetalle,
                }
            });
            if (!buscarDetalle) {
                mensaje = "El id no existe";
            } 
            else {
                buscarDetalle.precio = precio;
                buscarDetalle.cantidad = cantidad;
                buscarDetalle.idProductos = idProductos;
                buscarDetalle.idOrden = idOrden;
                
                await buscarDetalle.save();
                mensaje = "Orden actualizado";
            }
        }
        res.send(mensaje);
    }
};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Carrito = require('../modelo/modeloCarrito.js');
const { validationResult } = require('express-validator');
const moment = require('moment');


exports.ListaCarrito = async(req, res) => {
    try {
        const detalle = await Carrito.findAll();
        console.log(detalle);
        //res.json(producto);
        res.render('carrito',{detalle});
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};


/*exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { idCarrito } = req.query;
    var mensaje = "";
    if (!idCarrito) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarCarrito = await Carrito.findOne({
            where: {
                idCarrito: idCarrito,
            }
        });
        if (!buscarCarrito) {
            mensaje = "El id no existe";
        } else {
            await Carrito.destroy({
                where: {
                    idCarrito: idCarrito,
                }
            }).then((data) => {
                console.log(data);
                res.render('carrito');
            }).catch((error) => {
                console.log(error);
                mensaje = "Error en el servidor";
            });
        }
    }
    res.send(mensaje);
};*/

exports.eliminarQuery = async(req, res) => {
    await prisma.detallecarrito.delete({
        where:{
            idCarrito:Number(req.body.idCarrito)
        }
    })
    res.redirect('/usuarios/carrito')
}
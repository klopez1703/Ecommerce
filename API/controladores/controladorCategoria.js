const Categoria = require('../modelo/modeloCategoria');
const { validationResult } = require('express-validator');
const moment = require('moment');
exports.listaCategoria = async(req, res) => {
    try {
        const categoria = await Categoria.findAll();
        console.log(categoria);
        res.json(categoria);
    } catch {
        res.send("Ocurrio a un error en el servidor");

    }


};


exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos")
    } else {
        const { nomCategoria } = req.body;

        if (!nomCategoria) {
            res.send("No se ingreso la categoria");
            console.log(nomCategoria);
        } else {
            var nuevocategoria = await Categoria.create({
                nomCategoria
            }).then((data) => {
                console.log(data);
                res.send("Registro guardado");
            }).catch((error) => {
                if (error) {
                    console.log(error);
                    res.send("Error al guardar los datos");
                }

            });
            console.log(nomCategoria);
            res.send("Categoria registrada");

        }
    }

};


exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { idCategoria } = req.query;
    var mensaje = "";
    if (!idCategoria) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto";
    } else {
        const buscarCategoria = await Categoria.findOne({
            where: {
                idCategoria: idCategoria,
            }
        });
        if (!buscarCategoria) {
            mensaje = "El id no existe";
        } else {
            await Categoria.destroy({
                where: {
                    idCategoria: idCategoria,
                }
            }).then((data) => {
                console.log(data);
                mensaje = "Categoria Eliminada";
            }).catch((error) => {
                console.log(error);
                mensaje = "Error en el servidor";
            });
        }
    }
    res.send(mensaje);
};


exports.actualizarQuery = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { idCategoria } = req.query;
        const { nomCategoria } = req.body;
        console.log(req.body);
        var mensaje = "";
        if (!idCategoria) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            if (!nomCategoria) {
                mensaje = "Debe enviar el nombre de la marca";
            } else {
                var buscarCategoria = await Categoria.findOne({
                    where: {
                        idCategoria: idCategoria,
                    }
                });
                if (!buscarCategoria) {
                    mensaje = "El id no existe";
                } else {
                    buscarCategoria.nomCategoria = nomCategoria;
                    await buscarCategoria.save();
                    mensaje = "Registro actualizado";
                }
            }

        }
        res.send(mensaje);
    }


};
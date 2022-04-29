const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Productos = require('../modelo/modeloProducto');
const Categoria = require('../modelo/modeloCategoria.js');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.buscarProducto=async(req,res)=>{
    const producto=await prisma.productos.findMany({
        where:{
            nombre:req.query.nombre
        }
    })
    res.render('productos',{producto:producto})
}

exports.ListaProductos = async(req, res) => {
    try {
        const producto = await Productos.findAll();
        console.log(producto);
        //res.json(producto);
        res.render('productos',{producto});
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};
exports.ListaProductosID = async(req, res) => {
    const {idProductos}=req.params;
    try {
        const producto = await Productos.findOne({where:{idProductos}});
        console.log(producto);
        //res.json(producto);
        res.render('productoVista',{producto});
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};

//en caso de que falle borre esto
exports.postProducto=(req,res)=>{
    if (!req.session.userId) return res.redirect("/usuarios/login");
    res.render('formProducto')
}
//.....
exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos")
    } else {
        const { nombre, precio, descripcion, stock, imagen, idCategoria, codProducto, estadoProducto} = req.body;

        const categoria = await Categoria.findOne({
            where: {
                idCategoria: idCategoria
            }
        });
        if (!categoria) {
            res.send("La categoria del producto no existe");
        } else {

            const producto = await Productos.findOne({
                where: {
                    codProducto: codProducto
                }
            });
            if (producto) {
                res.send("El codigo del producto ya existe");
            } else {
                var nuevoproducto = await Productos.create({
                    nombre: nombre,
                    precio: precio,
                    descripcion: descripcion,
                    stock: stock,
                    imagen: req.file.filename,
                    idCategoria: idCategoria,
                    codProducto: codProducto,
                    estadoProducto: estadoProducto,
                }).then((data) => {
                    console.log(data);
                    //res.send("Registro Guardado");
                    res.redirect('formProducto');
                }).catch((error) => {
                    if (error) {
                        console.log(error);
                        res.send("Error al guardar los datos");
                    }
                });
            }


        }

    }

};

exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { idProductos } = req.query;
    var mensaje = "";
    if (!idProductos) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarProductos = await Productos.findOne({
            where: {
                idProductos: idProductos,
            }
        });
        if (!buscarProductos) {
            mensaje = "El id no existe";
        } else {
            await Productos.destroy({
                where: {
                    idProductos: idProductos,
                }
            }).then((data) => {
                console.log(data);
                mensaje = "Producto Eliminado";
                
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
        const { idProductos } = req.query;
        const {  nombre, precio, descripcion, stock, imagen, idCategoria, codProducto, estadoProducto  } = req.body;
        var mensaje = "";
        if (!idProductos) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            var buscarProductos = await Productos.findOne({
                where: {
                    idProductos: idProductos,
                }
            });
            if (!buscarProductos) {
                mensaje = "El id no existe";
            } 
            var buscarNombre = await Categoria.findOne({
                where: {
                    idCategoria: idCategoria,
                }
            });
            if (buscarNombre) {
                mensaje = "El producto ya existe";
            }else {
                buscarProductos.nombre = nombre;
                buscarProductos.precio = precio;
                buscarProductos.descripcion = descripcion;
                buscarProductos.stock = stock;
                buscarProductos.imagen = imagen;
                buscarProductos.idCategoria = idCategoria;
                buscarProductos.codProducto = codProducto;
                buscarProductos.estadoProducto = estadoProducto;
                await buscarProductos.save();
                mensaje = "Producto actualizado";
            }
        }
        res.send(mensaje);
    }
};
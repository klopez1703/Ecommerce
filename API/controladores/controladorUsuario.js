const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Usuario = require("../modelo/modeloUsuario");
const { validationResult } = require("express-validator");
const moment = require("moment");
const { compare } = require("bcrypt");
const { request } = require("express");
const { response } = require("express");
//const { redirect } = require('express/lib/response');

exports.ListaUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    console.log(usuario);
    res.json(usuario);
  } catch {
    res.send("Ocurrio un error en el servidor");
  }
};

exports.getLogin = (req, res) => {
  if(req.session.userId) return res.redirect('/')
  res.render("login");
};

exports.producto = async (req, res) => {
  if (!req.session.userId) return res.redirect("/usuarios/login");
  const { idProducto } = req.body;
  await prisma.detallecarrito.create({
    data: { idProducto: Number(idProducto), idusuario: req.session.userId },
  });
  res.redirect("carrito");
};

exports.getCarrito = async (req, res) => {
  if (!req.session.userId) return res.redirect("/usuarios/login");
  const productos = await prisma.detallecarrito.findMany({
    where: { idusuario: req.session.userId },
    select: { productos: true, idCarrito: true },
  });
  res.render("carrito", { productos });
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  console.log(req.body);
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    console.log(usuario);
    if (!usuario) return res.render("login", { error: "datos incorrectos" });
    let valido = await compare(password, usuario.password);
    if (!valido) return res.render("login", { error: "datos incorrectos" });
    //res.json(usuario);
    req.session.userId = usuario.idusuario;
    res.redirect("/productos");
  } catch (error) {
    console.log(error);
    res.send("Ocurrio un error en el servidor");
  }
};

exports.cerrarSecion=async(req=request,res=response)=>{
  req.session.destroy((error)=>{
    if(error){
      console.log(error);
      return
    }
    res.clearCookie('secionID')
  res.redirect('/')

  })
}

exports.UsuarioMaximo = async (req, res) => {
  var BuscarUsuario = await Usuario.max("idusuario", {});

  console.log(BuscarUsuario);

  res.json(BuscarUsuario);
};

//en caso de que falle borre esto
exports.postUsuario = (req, res) => {
  if(req.session.userId) return res.redirect('/')
  res.render("registroUser");
};

//.....

exports.guardar = async (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    username,
    password,
    fechanacimiento,
    genero,
  } = req.body;

  // if (!nombre || !apellido || !correo || username || !password || !rolUsuario || !estado == null || !fechanacimiento || !genero) {
  //console.log("Llene todos los datos");
  const buscarUsuario = await Usuario.findOne({
    where: {
      correo: correo,
    },
  });
  if (buscarUsuario) {
    res.send("El correo ya existe");
  } else
    var nuevousuario = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      username: username,
      password: password,
      rolUsuario: "cliente",
      estado: 1,
      fechanacimiento: fechanacimiento,
      genero: genero,
    })
      .then((data) => {
        console.log(data);
        res.redirect('registro');
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          res.send("Error al guardar los datos");
        }
      });
};

exports.eliminarQuery = async (req, res) => {
  console.log(req.query);
  const { idusuario } = req.query;
  var mensaje = "";
  if (!idusuario) {
    mensaje =
      "El id no debe contener valores nulos o no esta enviendo el parametro correcto";
  } else {
    const buscarUsuario = await Usuario.findOne({
      where: {
        idusuario: idusuario,
      },
    });
    if (!buscarUsuario) {
      mensaje = "El id no existe";
    } else {
      await Usuario.destroy({
        where: {
          idusuario: idusuario,
        },
      })
        .then((data) => {
          console.log(data);
          mensaje = "Usuario Eliminado";
        })
        .catch((error) => {
          console.log(error);
          mensaje = "Error en el servidor";
        });
    }
  }
  res.send(mensaje);
};

exports.Actualizarquery = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.send("Los datos ingresados no son validos");
  } else {
    const { idusuario } = req.query;
    const {
      nombre,
      apellido,
      correo,
      username,
      password,
      rolUsuario,
      estado,
      fechanacimiento,
      genero,
    } = req.body;
    var mensaje = "";
    if (!id) {
      mensaje =
        "El id no debe contener valores nulos o no esta enviendo el parametro correcto";
    } else {
      var buscarUsuario = await Usuario.findOne({
        where: {
          idusuario: idusuario,
        },
      });
      if (!buscarUsuario) {
        mensaje = "El id no existe";
      }
      var buscarCorreo = await Usuario.findOne({
        where: {
          correo: correo,
        },
      });
      if (buscarCorreo) {
        mensaje = "El correo ya existe";
      } else {
        buscarUsuario.nombre = nombre;
        buscarUsuario.apellido = apellido;
        buscarUsuario.correo = correo;
        buscarUsuario.username = username;
        buscarUsuario.password = password;
        buscarUsuario.rolUsuario = rolUsuario;
        buscarUsuario.estado = estado;
        buscarUsuario.fechanacimiento = fechanacimiento;
        buscarUsuario.genero = genero;
        await buscarUsuario.save();
        mensaje = "Usuario actualizado";
      }
    }
    res.send(mensaje);
  }
};
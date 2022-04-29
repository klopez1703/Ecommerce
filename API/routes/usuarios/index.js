const { Router } = require('express');
const controladorUsuario = require('../../controladores/controladorUsuario');
const {body, param} = require('express-validator');
const router = Router();

router.get('/', controladorUsuario.ListaUsuarios);
router.get('/login', controladorUsuario.getLogin);
router.get('/registro', controladorUsuario.postUsuario);
router.get('/carrito', controladorUsuario.getCarrito);
router.post('/guardar', controladorUsuario.guardar);
router.get('/cerrarSecion', controladorUsuario.cerrarSecion);
router.post('/login', controladorUsuario.login);
router.post('/producto', controladorUsuario.producto);
router.put('/modificar', controladorUsuario.Actualizarquery);
router.delete('/eliminar', controladorUsuario.eliminarQuery);


module.exports = router;
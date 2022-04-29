const { Router } = require('express');
const controladorCarrito = require('../../controladores/controladorCarrito');
const {body, param} = require('express-validator');
const router = Router();

router.post('/detalle', controladorCarrito.ListaCarrito);
router.post('/eliminar', controladorCarrito.eliminarQuery);

module.exports = router;
const { Router } = require('express');
const controladorCategoria = require('../../controladores/controladorCategoria');
const {body, param} = require('express-validator');
const router = Router();

router.get('/', controladorCategoria.listaCategoria);
router.post('/guardar', controladorCategoria.guardar);
router.put('/modificar', controladorCategoria.actualizarQuery);
router.delete('/eliminar', controladorCategoria.eliminarQuery);

module.exports = router;
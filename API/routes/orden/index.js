const { Router } = require('express');
const controladorOrden = require('../../controladores/controladorOrden');
const {body, param} = require('express-validator');
const router = Router();

router.get('/', controladorOrden.ListaOrden);
router.post('/guardar', controladorOrden.guardar);
router.put('/modificar', controladorOrden.Actualizarquery);
router.delete('/eliminar', controladorOrden.eliminarQuery);

module.exports = router;
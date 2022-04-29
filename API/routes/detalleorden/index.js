const { Router } = require('express');
const controladorDetalleOrden = require('../../controladores/controladorDetalleOrden');
const {body, param} = require('express-validator');
const router = Router();

router.get('/', controladorDetalleOrden.ListaDetalleOrden);
router.post('/guardar', controladorDetalleOrden.guardar);
router.put('/modificar', controladorDetalleOrden.Actualizarquery);
router.delete('/eliminar', controladorDetalleOrden.eliminarQuery);

module.exports = router;
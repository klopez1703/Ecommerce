const { Router } = require('express');
const controladorProducto = require('../../controladores/controladorProductos');
const {body, param} = require('express-validator');
const { upload } = require('../../config/multer');
const router = Router();

router.get('/', controladorProducto.ListaProductos);
router.get('/buscar', controladorProducto.buscarProducto);
router.get('/formProducto', controladorProducto.postProducto);
router.get('/:idProductos', controladorProducto.ListaProductosID);
router.post('/guardar',upload.single('imagen'),controladorProducto.guardar);
router.put('/modificar', controladorProducto.Actualizarquery);
router.delete('/eliminar', controladorProducto.eliminarQuery);

module.exports = router;
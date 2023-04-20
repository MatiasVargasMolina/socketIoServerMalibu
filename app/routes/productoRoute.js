const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

// Rutas para productos
router.post('/productos', productController.crearProducto);
router.get('/productos', productController.obtenerProductos);
router.get('/productos/:id', productController.obtenerProducto);
router.put('/productos/:id', productController.actualizarProducto);
router.delete('/productos/:id', productController.eliminarProducto);

module.exports = router;

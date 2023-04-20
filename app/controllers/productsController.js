const Producto = require('../models/producto');

// Crear un nuevo producto
exports.crearProducto = async (req, res, next) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Obtener todos los productos
exports.obtenerProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Obtener un producto por su ID
exports.obtenerProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      res.status(404).json({ mensaje: 'El producto no existe' });
      return next();
    }
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Actualizar un producto por su ID
exports.actualizarProducto = async (req, res, next) => {
  try {
    const producto = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar un producto por su ID
exports.eliminarProducto = async (req, res, next) => {
  try {
    await Producto.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: 'El producto ha sido eliminado' });
  } catch (error) {
    console.log(error);
    next();
  }
};

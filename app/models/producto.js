const mongoose = require('mongoose');
const User = require("./user.model")
const Category = require("./categoria")
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  precioDeEnvio: { type: Number, required: true },
  imagen: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;

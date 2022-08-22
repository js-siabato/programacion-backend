const mongoose = require("mongoose");

const productosCollection = "productos";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      maxLength: [50, "MAXIMO 50 CARACTERES!!"],
    },
    descripcion: {
      type: String,
      required: true,
      maxLength: [100, "MAXIMO 100 CARACTERES!!"],
    },
    foto: {
      type: String,
      required: true,
      maxLength: [100, "MAXIMO 100 CARACTERES!!"],
    },
    precio: { type: Number, required: true, maxLength: 20 },
    stock: { type: Number, required: true, maxLength: 20 },
    timestamp: { type: Date, required: true, default: Date.now },
    codigo: {
      type: String,
      required: true,
      maxLength: [20, "MAXIMO 20 CARACTERES!!"],
    },
  },
  { versionKey: false }
);

module.exports = {
  Producto: mongoose.model(productosCollection, productoSchema),
};

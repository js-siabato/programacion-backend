const mongoose = require("mongoose");

const carritoCollection = "carritos";

const carritoSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true, default: Date.now },
  productos: {
    type: Array,
    required: true,
  },
});

module.exports = {
  Carrito: mongoose.model(carritoCollection, carritoSchema),
};

const mongoose = require("mongoose");

const mensajeCollection = "mensajes";

const mensajeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      maxLength: [50, "MAXIMO 50 CARACTERES!!"],
    },
    timestamp: { type: Date, required: true, default: Date.now },
    mensaje: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = {
  Mensaje: mongoose.model(mensajeCollection, mensajeSchema),
};

const mongoose = require("mongoose");

const mensajeCollection = "mensajes";

const AuthorSchema = mongoose.Schema({
  email: { type: String, required: true, maxLength: 50 },
  nombre: { type: String, required: true, maxLength: 50 },
  apellido: { type: String, required: true, maxLength: 50 },
  edad: { type: String, required: true, maxLength: 3 },
  alias: { type: String, required: true, maxLength: 50 },
  avatar: { type: String, required: true },
});

const mensajeSchema = new mongoose.Schema({
  author: { type: AuthorSchema },
  text: { type: String, required: true, maxLength: 500 },
  timestamp: { type: Date, required: true, default: Date.now },
  id: { type: Number, unique: true, required: true },
});

module.exports = {
  Mensaje: mongoose.model(mensajeCollection, mensajeSchema),
};

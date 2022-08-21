import mongoose from "mongoose";
import { Usuario } from "../models/product.js";

CRUD();

async function CRUD() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log(error);
  }
}

async function insert(table, products) {
  var data;
  await knex(table)
    .insert(products)
    .then((result) => {
      data = result;
    })
    .catch((err) => {
      console.log(`[ERROR] -> Error al insertar productos: ${err}`);
    });
  return data;
}
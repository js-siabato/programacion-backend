const config = require("../config");
const { Producto } = require("../models/product");
const { Carrito } = require("../models/cart");
const { Mensaje } = require("../models/message");
const mongoose = require("mongoose");

CRUD();

async function CRUD() {
  try {
    if (config.DB.remoteDB === true) {
      await mongoose.connect(
        "mongodb+srv://" +
          config.mongoDBRemote.user +
          ":" +
          config.mongoDBRemote.password +
          "@cluster0.plaxnp5.mongodb.net/" +
          config.mongoDBRemote.database +
          "?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Conectado a MongoDB remota!!");
    } else {
      await mongoose.connect(
        "mongodb://localhost:27017/" + config.mongoDBLocal.database,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Conectado a MongoDB!!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function insert(table, data) {
  switch (table) {
    case "productos":
      return await Producto.insertMany(data);
    case "carritos":
      const cartSaveModel = new Carrito(data);
      const result = await cartSaveModel.save(data);
      return result._id;
    case "mensajes":
      const messageSaveModel = new Mensaje(data);
      const resultM = await messageSaveModel.save();
      return resultM._id;
  }
}

async function list(table) {
  switch (table) {
    case "productos":
      return await Producto.find();
    case "mensajes":
      return await Mensaje.find();
  }
}

async function get(table, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  switch (table) {
    case "productos":
      return await Producto.findById(id);
    case "carritos":
      return await Carrito.findById(id);
  }
}

async function update(table, id, body) {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;

  switch (table) {
    case "productos":
      return await Producto.findByIdAndUpdate(id, {
        $set: {
          nombre: body.nombre,
          descripcion: body.descripcion,
          foto: body.foto,
          precio: body.precio,
          stock: body.stock,
          codigo: body.codigo,
        },
      });
    case "carritos":
      await Carrito.findByIdAndUpdate(id, {
        $push: { productos: body },
      });
      return await Carrito.find({ _id: id });
  }
}

async function remove(table, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  switch (table) {
    case "productos":
      return await Producto.findByIdAndDelete(id);
    case "carritos":
      return await Carrito.findByIdAndDelete(id);
  }
}

async function removeProductCart(table, idCart, itemToRemove) {
  if (!mongoose.Types.ObjectId.isValid(idCart)) return false;
  const document = await Carrito.findById(idCart);
  document.productos.pull(itemToRemove);
  await document.save();
  return await Carrito.findById(idCart);
}

module.exports = {
  list,
  insert,
  get,
  update,
  remove,
  removeProductCart,
};

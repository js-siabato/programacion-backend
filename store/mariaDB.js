const config = require("../config");
const knex = require("knex")({
  client: config.DB.clientProduct,
  connection: {
    host: config.mariaDB.host,
    user: config.mariaDB.user,
    password: config.mariaDB.password,
    database: config.mariaDB.database,
  },
});

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

async function list(table) {
  var data = [];
  await knex
    .from(table)
    .select("*")
    .then((rows) => {
      rows.forEach(function (value) {
        data.push(value);
      });
    })
    .catch((err) => {
      console.log(`[ERROR] -> Error al consultar productos: ${err}`);
    });
  return data;
}

async function get(table, id) {
  var data;
  await knex
    .from(table)
    .select("*")
    .where("id", id)
    .then((rows) => {
      data = rows;
    })
    .catch((err) => {
      console.log(`[ERROR] -> Error al consultar producto: ${err}`);
    });
  return data;
}

async function remove(table, id) {
  var data;
  await knex
    .from(table)
    .where("id", id)
    .del()
    .then((result) => {
      data = result;
    })
    .catch((err) => {
      console.log(`[ERROR] -> Error al eliminar producto: ${err}`);
    });
  return data;
}

async function update(table, id, body) {
  var data;
  await knex
    .from(table)
    .where("id", id)
    .update({
      nombre: body.nombre,
      descripcion: body.descripcion,
      foto: body.foto,
      precio: body.precio,
      stock: body.stock,
      timestamp: knex.fn.now(),
      codigo: body.codigo,
    })
    .then((result) => {
      data = result;
    })
    .catch((err) => {
      console.log(`[ERROR] -> Error al actualizar producto: ${err}`);
    });
  return data;
}

module.exports = { insert, list, get, remove, update };

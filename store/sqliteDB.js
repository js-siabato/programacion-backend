const config = require("../config");
const knex = require("knex")({
  client: config.DB.clientMessages,
  connection: {
    filename: config.sqliteDB.file,
  },
});

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

async function insert(table, message) {
  var data;
  await knex(table)
    .insert(message)
    .then((result) => {
      data = result;
    })
    .catch((err) => {
      console.log(`[ERROR] -> Error al insertar productos: ${err}`);
    });
  return data;
}

module.exports = { list, insert };

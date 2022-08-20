const config = require("../config");
const knex = require("knex")({
  client: config.DB.clientMessages,
  connection: {
    filename: config.sqliteDB.file,
  },
});

(async () => {
  if (await knex.schema.hasTable("mensajes")) {
    await knex.schema.dropTable("mensajes");
    console.log("Tabla mensajes eliminada exitosamente.");
  }
  knex.schema
    .createTable("mensajes", (table) => {
      table.increments("id");
      table.string("email", 30);
      table.timestamp("timestamp").defaultTo(knex.fn.now());
      table.string("mensaje");
    })
    .then(() => {
      console.log("Tabla mensajes creada exitosamente.");
    })
    .catch((err) => {
      console.log(
        `[ERROR] -> Error al intentar crear la tabla mensajes: ${err}`
      );
    })
    .finally(() => {
      knex.destroy();
    });
})();

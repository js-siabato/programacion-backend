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

(async () => {
  if (await knex.schema.hasTable("productos")) {
    await knex.schema.dropTable("productos");
    console.log("Tabla productos eliminada exitosamente.");
  }
  knex.schema
    .createTable("productos", (table) => {
      table.increments("id");
      table.string("nombre", 15);
      table.string("descripcion", 50);
      table.string("foto", 100);
      table.float("precio");
      table.integer("stock");
      table.timestamp("timestamp").defaultTo(knex.fn.now());
      table.string("codigo", 10);
    })
    .then(() => {
      console.log("Tabla productos creada exitosamente.");
    })
    .catch((err) => {
      console.log(
        `[ERROR] -> Error al intentar crear la tabla productos: ${err}`
      );
    })
    .finally(() => {
      knex.destroy();
    });
})();

const config = require("../../config");

let store;
if (config.DB.clientMessages === "mysql") {
  store = require("../../store/mariaDB");
} else if (config.DB.clientMessages === "mongoDB") {
  store = require("../../store/mongoDB");
} else if (config.DB.clientMessages === "sqlite3") {
  store = require("../../store/sqliteDB");
}

const ctrl = require("./controller");

module.exports = ctrl(store);

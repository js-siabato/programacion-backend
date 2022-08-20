const store = require("../../store/sqliteDB");
const ctrl = require("./controller");

module.exports = ctrl(store);

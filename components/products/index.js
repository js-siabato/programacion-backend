const store = require("../../store/mariaDB");
const ctrl = require("./controller");

module.exports = ctrl(store);

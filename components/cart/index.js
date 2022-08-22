const config = require("../../config");

let store;
if (config.DB.clientCarts === "mysql") {
  store = require("../../store/mariaDB");
} else if (config.DB.clientCarts === "mongoDB") {
  store = require("../../store/mongoDB");
} else if (config.DB.clientCarts === "firebase") {
  store = require("../../store/firebase");
}

const ctrl = require("./controller");

module.exports = ctrl(store);

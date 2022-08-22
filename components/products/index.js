const config = require("../../config");

let store;
if (config.DB.clientProduct === "mysql") {
  store = require("../../store/mariaDB");
} else if (config.DB.clientProduct === "mongoDB") {
  store = require("../../store/mongoDB");
} else if (config.DB.clientProduct === "firebase") {
  store = require("../../store/firebase");
}

const ctrl = require("./controller");

module.exports = ctrl(store);

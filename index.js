const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config.js");
const products = require("./components/products/network");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use("/api/productos", products);

app.use("/static", express.static(__dirname + "/public"));

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

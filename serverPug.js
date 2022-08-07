const express = require("express");
const app = express();

const config = require("./config.js");
const products = require("./components/products/network");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "pug");
app.set("views", "./pug/views");

app.use("/api/productos", products);

app.get("/", (req, res) => {
  try {
    res.render("index.pug");
  } catch (err) {
    res.status(500).send("Error en el proceso GET del home: " + err);
  }
});

const server = app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});

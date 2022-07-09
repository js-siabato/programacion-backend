const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config.js");
const Contenedor = require("./SiabatoJoan-04.js");

const app = express();

app.use(bodyParser.json());

const contenedor = new Contenedor("./productos.txt");

app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

app.get("/productos", async (req, res) => {
  contenedor
    .getAll()
    .then((result) => {
      if (!result.length) {
        res.send({ result: "ARCHIVO VACIO" });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log("🚀 ~ [ERROR]", err);
    });
});

app.get("/productoRandom", async (req, res) => {
  contenedor
    .getAll()
    .then((result) => {
      if (!result.length) {
        res.send({ result: "ARCHIVO VACIO" });
      } else {
        const random = Math.floor(
          Math.random() * (result.length - 1 - 0 + 1) + 0
        );
        res.send(result[random]);
      }
    })
    .catch((err) => {
      console.log("🚀 ~ [ERROR]", err);
    });
});

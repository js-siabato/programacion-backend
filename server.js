const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const fs = require("fs");

const config = require("./config.js");
const products = require("./components/products/network");
const cart = require("./components/cart/network");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", products);
app.use("/api/carrito", cart);

app.use((req, res) => {
  res
    .status(404)
    .send({
      error: "-2",
      descripción: `ruta ${req.url} metodo ${req.method} no implementadas.`,
    });
});

const server = httpServer.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});

io.on("connection", (socket) => {
  console.log(`El cliente ${socket.id} se ha conectado.`);
  const products = fs.readFileSync(config.data.products, "utf-8");
  const messages = fs.readFileSync(config.data.messages, "utf-8");

  socket.emit("products", JSON.parse(products));
  socket.emit("messages", JSON.parse(messages));

  socket.on("newProduct", (newProduct) => {
    io.sockets.emit("products", newProduct);
  });

  socket.on("newMessage", (message) => {
    let docMessages = fs.readFileSync(config.data.messages, "utf-8");
    if (!docMessages || !JSON.parse(docMessages).length) {
      docMessages = [];
    } else {
      docMessages = JSON.parse(docMessages);
    }
    docMessages.push(message);
    fs.writeFileSync(config.data.messages, JSON.stringify(docMessages));

    io.sockets.emit("messages", docMessages);
  });
});

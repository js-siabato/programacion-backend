const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const fs = require("fs");
const productsData = fs.readFileSync("data/products.txt", "utf-8");

const handlebars = require("express-handlebars");

const config = require("./config.js");
const products = require("./components/products/network");
const card = require("./components/cart/network");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/public",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("home", { list: JSON.parse(productsData) });
});

app.use("/api/productos", products);
app.use("/api/carrito", card);

const server = httpServer.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});

io.on("connection", (socket) => {
  console.log(`El cliente ${socket.id} se ha conectado.`);
  const products = fs.readFileSync("data/products.txt", "utf-8");
  const messages = fs.readFileSync("data/messages.txt", "utf-8");

  if (JSON.parse(products).length) {
    socket.emit("products", JSON.parse(products));
  }
  socket.emit("messages", JSON.parse(messages));

  socket.on("newProduct", (product) => {
    let docProducts = fs.readFileSync("data/products.txt", "utf-8");
    if (!docProducts || !JSON.parse(docProducts).length) {
      docProducts = [];
    } else {
      docProducts = JSON.parse(docProducts);
    }
    docProducts.push(product);
    fs.writeFileSync("data/products.txt", JSON.stringify(docProducts));

    io.sockets.emit("products", docProducts);
  });

  socket.on("newMessage", (message) => {
    let docMessages = fs.readFileSync("data/messages.txt", "utf-8");
    if (!docMessages || !JSON.parse(docMessages).length) {
      docMessages = [];
    } else {
      docMessages = JSON.parse(docMessages);
    }
    docMessages.push(message);
    fs.writeFileSync("data/messages.txt", JSON.stringify(docMessages));

    io.sockets.emit("messages", docMessages);
  });
});

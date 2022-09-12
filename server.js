const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const config = require("./config.js");

const handlebars = require("express-handlebars");

const products = require("./components/products/network");
const productsTest = require("./components/productsTest/network");
const cart = require("./components/cart/network");
const messages = require("./components/messages/network");

const { normalize, schema } = require("normalizr");

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

//VISTA PARA PRODUCTOS USANDO HANDLEBARS
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/productos-test", (req, res) => {
  res.render("products");
});

app.get("/mensajes", (req, res) => {
  res.render("messages");
});

app.use("/api/productos", products);
app.use("/api/productos-test", productsTest);
app.use("/api/carrito", cart);
app.use("/api/mensajes", messages);

app.use((req, res) => {
  res.status(404).send({
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

  socket.on("newProduct", (products) => {
    io.sockets.emit("products", products);
  });

  socket.on("newMessage", (messages) => {
    io.sockets.emit("messages", messages);
  });
});

const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const config = require("./config.js");

const handlebars = require("express-handlebars");

const products = require("./components/products/network");
const cart = require("./components/cart/network");

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

app.use("/api/productos", products);
app.use("/api/carrito", cart);

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

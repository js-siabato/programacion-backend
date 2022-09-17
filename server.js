const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
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

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/*----------------------------------------------*/
/*           Persistencia por MongoDB.          */
/*----------------------------------------------*/
const MongoStore = require("connect-mongo");
const { setTimeout } = require("timers/promises");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/*----------------------------------------------*/

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://" +
        config.mongoDBRemote.user +
        ":" +
        config.mongoDBRemote.password +
        "@cluster0.zrdkmus.mongodb.net/" +
        config.mongoDBRemote.database +
        "?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      resave: false,
      ttl: 60,
    }),
    secret: "secret!!",
  })
);

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
  if (req.query.name && req.session.name) {
    res.render("home", { name: req.query.name });
  } else {
    res.render("home", { name: "" });
  }
});

app.get("/login", (req, res, next) => {
  req.session.name = req.query.name;
  res.redirect(`/?name=${req.query.name}`);
});

app.get("/logout", (req, res) => {
  const name = req.session.name;
  req.session.destroy();
  res.render("logout", { name: name });
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

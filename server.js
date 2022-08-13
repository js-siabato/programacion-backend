const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const fs = require("fs");

const handlebars = require("express-handlebars");

const config = require("./config.js");
const products = require("./components/products/network");

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

app.use("/", products);

const server = httpServer.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto ", config.api.port);
});

server.on("error", (error) => {
  console.log(`Error en el servidor ${error}`);
});

io.on("connection", (socket) => {
  console.log(`El cliente ${socket.id} se ha conectado.`);
  const messages = fs.readFileSync("messages.txt", "utf-8");
  socket.emit("messages", JSON.parse(messages));

  socket.on("newProduct", (data) => {
    io.sockets.emit("products", data);
  });

  socket.on("newMessage", (message) => {
    let docMessages = fs.readFileSync("messages.txt", "utf-8");
    if (!docMessages || !JSON.parse(docMessages).length) {
      docMessages = [];
    } else {
      docMessages = JSON.parse(docMessages);
    }
    docMessages.push(message);
    fs.writeFileSync("messages.txt", JSON.stringify(docMessages));

    io.sockets.emit("messages", docMessages);
  });
});

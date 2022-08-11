const express = require("express");

const app = express();
const router = express.Router();

const Controller = require("./index");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routers
router.post("/", insert);
router.delete("/:id", remove);
router.get("/:id/productos", listCart);
router.post("/:id/productos", insertProductsCart);
router.delete("/:id/productos/:id_prod", removeProductCart);

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((cart) => {
      res.status(201).send(cart);
    })
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((carts) => {
      res.status(200).send(carts);
    })
    .catch(next);
}

function listCart(req, res, next) {
  Controller.listCart(req.params.id)
    .then((products) => {
      res.status(200).send(products);
    })
    .catch(next);
}

function insertProductsCart(req, res, next) {
  Controller.insertProductsCart(req.params.id, req.body)
    .then((cart) => {
      res.status(200).send(cart);
    })
    .catch(next);
}

function removeProductCart(req, res, next) {
  Controller.removeProductCart(req.params.id, req.params.id_prod)
    .then((cart) => {
      res.status(200).send(cart);
    })
    .catch(next);
}

module.exports = router;

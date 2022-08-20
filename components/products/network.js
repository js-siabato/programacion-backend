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
router.get("/", list);
router.get("/:id", get);
router.post("/", insert);
router.put("/:id", update);
router.delete("/:id", remove);

//Internal Functions
function list(req, res, next) {
  Controller.list()
    .then((list) => {
      res.status(200).send(list);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(next);
}

function insert(req, res, next) {
  Controller.insert(req.body)
    .then((product) => {
      res.status(201).send(product);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.params.id, req.body)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(next);
}

module.exports = router;

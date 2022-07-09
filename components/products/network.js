const express = require("express");

const Controller = require("./controller");

const router = express.Router();

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
      res.send(list);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((product) => {
      res.send(product);
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
      res.send(product);
    })
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((product) => {
      res.send(product);
    })
    .catch(next);
}

module.exports = router;

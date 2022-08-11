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
router.post("/", insert);

//Internal Functions
function list(req, res, next) {
  Controller.list()
    .then((messages) => {
      res.status(200).send(messages);
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

module.exports = router;

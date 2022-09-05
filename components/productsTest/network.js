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

//Internal Functions
function list(req, res, next) {
  Controller.list()
    .then((list) => {
      res.status(200).send(list);
    })
    .catch(next);
}

module.exports = router;
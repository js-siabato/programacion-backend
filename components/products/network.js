const express = require("express");

const app = express();
const router = express.Router();

const Controller = require("./controller");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

router.get("/", (req, res) => {
  Controller.list()
    .then((list) => {
      if (list.message) {
        res.render("home", { list: 0 });
      } else {
        res.render("home", { list });
      }
    })
    .catch((err) => {
      res.status(500).send("ERROR: " + err);
    });
});

//Routers
router.get("/api/productos", list);
router.get("/api/productos/:id", get);
router.post("/api/productos", insert);
router.put("/api/productos/:id", update);
router.delete("/api/productos/:id", remove);

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

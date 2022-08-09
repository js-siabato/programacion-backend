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

//Routers
router.post("/", insert);
router.delete("/:id", remove);
router.get("/:id/productos", listCard);
router.post("/:id/productos", insertCard);
router.delete("/:id/productos/:id_prod", removeProductCard);

function insert() {}

function remove() {}

function listCard() {}

function insertCard() {}

function removeProductCard() {}

module.exports = router;

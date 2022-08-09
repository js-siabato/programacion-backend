const fs = require("fs");

let products = JSON.parse(fs.readFileSync("data/products.txt", "utf-8"));

async function list() {
  if (!products.length) {
    return { message: "Sin productos!!" };
  } else {
    return products;
  }
}

async function get(id) {
  const product = products.find((product) => product.id == id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  } else {
    return product;
  }
}

async function insert(body) {
  let id = 1;
  if (!products || !products.length) {
    products = [];
  } else {
    id = products[products.length - 1].id + 1;
  }

  body.id = id;
  products.push(body);
  return body;
}

async function update(id, body) {
  let product = products.find((product) => product.id == id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  } else {
    product.title = body.title;
    product.price = body.price;
    product.thumbnail = body.thumbnail;
    return product;
  }
}

async function remove(id) {
  const product = products.find((product) => product.id == id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  } else {
    products.splice(products.indexOf(product), 1);
    return products;
  }
}

module.exports = { list, get, insert, update, remove };

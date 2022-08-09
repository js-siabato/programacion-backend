const fs = require("fs");
const config = require("../../config");

let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));

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
  if (!products.length) {
    products = [];
  } else {
    id = products[products.length - 1].id + 1;
  }
  for (let i = 0; i < body.length; i++) {
    body[i].id = id++;
    products.push(body[i]);
  }
  await fs.writeFileSync(config.data.products, JSON.stringify(products));
  return products;
}

async function update(id, body) {
  let product = products.find((product) => product.id == id);
  let list = products.filter((listProd) => listProd.id != id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  } else {
    product.title = body.title;
    product.price = body.price;
    product.thumbnail = body.thumbnail;
    list.push(product);
    await fs.writeFileSync(config.data.products, JSON.stringify(list));
    return product;
  }
}

async function remove(id) {
  const product = products.find((product) => product.id == id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  } else {
    products.splice(products.indexOf(product), 1);
    await fs.writeFileSync(config.data.products, JSON.stringify(products));
    return products;
  }
}

module.exports = { list, get, insert, update, remove };

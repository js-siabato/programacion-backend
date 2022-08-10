const fs = require("fs");
const CodeGenerator = require("node-code-generator");
const config = require("../../config");

const generator = new CodeGenerator();

async function list() {
  let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));
  if (!products.length) {
    return { message: "Sin productos!!" };
  }
  return products;
}

async function get(id) {
  let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));
  const product = products.find((product) => product.id == id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  }
  return product;
}

async function insert(body) {
  let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));
  let id = 1;
  if (!products.length) {
    products = [];
  } else {
    id = products[products.length - 1].id + 1;
  }
  for (let i = 0; i < body.length; i++) {
    body[i].id = id++;
    body[i].timestamp = Date.now();
    body[i].codigo = generator.randomChars(body[i].nombre, 8).toUpperCase();
    products.push(body[i]);
  }
  await fs.writeFileSync(config.data.products, JSON.stringify(products));
  return products;
}

async function update(id, body) {
  let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));
  let product = products.find((product) => product.id == id);
  let list = products.filter((listProd) => listProd.id != id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  }
  product.title = body.title;
  product.price = body.price;
  product.thumbnail = body.thumbnail;
  list.push(product);
  await fs.writeFileSync(config.data.products, JSON.stringify(list));
  return product;
}

async function remove(id) {
  let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));
  const product = products.find((product) => product.id == id);
  if (!product) {
    return { error: "Producto no encontrado!!" };
  }
  products.splice(products.indexOf(product), 1);
  await fs.writeFileSync(config.data.products, JSON.stringify(products));
  return products;
}

module.exports = { list, get, insert, update, remove };

const fs = require("fs");
const config = require("../../config");

let carts = JSON.parse(fs.readFileSync(config.data.carts, "utf-8"));
let products = JSON.parse(fs.readFileSync(config.data.products, "utf-8"));

async function insert() {
  let id = 1;

  if (!carts.length) {
    carts = [];
  } else {
    id = carts[carts.length - 1].id + 1;
  }

  const cart = {
    id: id++,
    timestamp: Date.now(),
    productos: [],
  };

  carts.push(cart);
  await fs.writeFileSync(config.data.carts, JSON.stringify(carts));
  return { id: cart.id };
}

async function remove(id) {
  const cart = carts.find((cart) => cart.id == id);
  if (!cart) {
    return { error: "Carrito no encontrado!!" };
  }
  carts.splice(carts.indexOf(cart), 1);
  await fs.writeFileSync(config.data.carts, JSON.stringify(carts));
  return carts;
}

async function listCart(id) {
  const cart = carts.find((cart) => cart.id == id);
  if (!cart) {
    return { Error: "Carrito no encontrado!!" };
  } else if (!cart.productos.length) {
    return { Info: "Carrito vacio!!" };
  }
  return cart.productos;
}

async function insertProductsCart(id, body) {
  const cart = carts.find((cart) => cart.id == id);
  const listCart = carts.filter((cart) => cart.id != id);
  const product = products.find((product) => product.id == body.id_prod);

  if (!cart) {
    return { Error: "Carrito no encontrado!!" };
  } else if (!product) {
    return { Error: "Producto no encontrado!!" };
  }

  cart.productos.push(product);
  listCart.push(cart);
  await fs.writeFileSync(config.data.carts, JSON.stringify(listCart));
  return cart;
}

async function removeProductCart(idCart, idProd) {
  const cart = carts.find((cart) => cart.id == idCart);
  const listCart = carts.filter((cart) => cart.id != idCart);

  if (!cart) {
    return { Error: "Carrito no encontrado!!" };
  }

  const product = cart.productos.find((product) => product.id == idProd);

  if (!product) {
    return { Error: "Producto no encontrado!!" };
  }

  cart.productos.splice(cart.productos.indexOf(product), 1);
  listCart.push(cart);
  await fs.writeFileSync(config.data.carts, JSON.stringify(listCart));
  return cart;
}

module.exports = {
  insert,
  remove,
  listCart,
  insertProductsCart,
  removeProductCart,
};

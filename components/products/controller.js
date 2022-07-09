let products = [
  {
    title: "Producto 1",
    price: 100,
    thumbnail: "http://test1.com",
    id: 1,
  },
  {
    title: "Producto 2",
    price: 200,
    thumbnail: "http://test2.com",
    id: 2,
  },
  {
    title: "Producto 3",
    price: 300,
    thumbnail: "http://test3.com",
    id: 3,
  },
];

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

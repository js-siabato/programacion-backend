const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(products) {
    let productsTxt = await fs.readFileSync(this.file, "utf-8");
    let id = 1;
    if (!productsTxt || !JSON.parse(productsTxt).length) {
      productsTxt = [];
    } else {
      productsTxt = JSON.parse(productsTxt);
      id = productsTxt[productsTxt.length - 1].id + 1;
    }
    for (let i = 0; i < products.length; i++) {
      products[i].id = id++;
      productsTxt.push(products[i]);
    }
    await fs.writeFileSync(this.file, JSON.stringify(productsTxt));
    return productsTxt;
  }

  async getById(id) {
    let productsTxt = await fs.readFileSync(this.file, "utf-8");
    productsTxt = !productsTxt ? [] : JSON.parse(productsTxt);
    return productsTxt.find((product) => product.id === id);
  }

  async getAll() {
    const products = await fs.readFileSync(this.file, "utf-8");
    if (!products) {
      return [];
    } else {
      return JSON.parse(products);
    }
  }

  async deleteById(id) {
    let productsTxt = await fs.readFileSync(this.file, "utf-8");
    productsTxt = !productsTxt ? [] : JSON.parse(productsTxt);
    let products = productsTxt.filter((product) => product.id != id);
    await fs.writeFileSync(this.file, JSON.stringify(products));
    return products;
  }

  async deleteAll() {
    let productsTxt = await fs.readFileSync(this.file, "utf-8");
    productsTxt = !productsTxt ? [] : JSON.parse(productsTxt);
    if (productsTxt.length > 0) {
      await fs.writeFileSync(this.file, JSON.stringify([]));
    }
    return await JSON.parse(fs.readFileSync(this.file, "utf-8"));
  }
}

const contenedor = new Contenedor("./productos.txt");

products = [
  {
    title: "Producto 1",
    price: 1,
    thumbnail: "http://test.com",
  },
  {
    title: "Producto 2",
    price: 2,
    thumbnail: "http://test.com",
  },
];

contenedor
  .save(products)
  .then((result) => {
    console.log("🚀 ~ [RESULT]", result);
  })
  .catch((err) => {
    console.log("🚀 ~ [ERROR]", err);
  });

// contenedor
//   .getAll()
//   .then((result) => {
//     if (!result.length) {
//       console.log("🚀 ~ [ARCHIVO VACIO]");
//     } else {
//       console.log("🚀 ~ [RESULT]", result);
//     }
//   })
//   .catch((err) => {
//     console.log("🚀 ~ [ERROR]", err);
//   });

// contenedor
//   .getById(4)
//   .then((result) => {
//     if (!result) {
//       console.log("🚀 ~ [PRODUCTO INEXISTENTE]");
//     } else {
//       console.log("🚀 ~ [RESULT]", result);
//     }
//   })
//   .catch((err) => {
//     console.log("🚀 ~ [ERROR]", err);
//   });

// contenedor
//   .deleteById(5)
//   .then((result) => {
//     console.log("🚀 ~ [RESULT]", result);
//   })
//   .catch((err) => {
//     console.log("🚀 ~ [ERROR]", err);
//   });

// contenedor
//   .deleteAll()
//   .then((result) => {
//     if (!result.length) {
//       console.log("🚀 ~ [ARCHIVO VACIO]");
//     }
//   })
//   .catch((err) => {
//     console.log("🚀 ~ [ERROR]", err);
//   });

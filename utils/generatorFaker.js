let faker = require("faker");
faker.locale = "es";

function generatorProducts() {
  return {
    nombre: faker.commerce.product(),
    descripcion: faker.commerce.productDescription(),
    stock: faker.datatype.number({ min: 0, max: 50 }),
    codigo: faker.random.alpha(8).toUpperCase(),
    precio: faker.commerce.price(),
    foto: faker.image.business(1234, 2345, true),
  };
}

module.exports = { generatorProducts };

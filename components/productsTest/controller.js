const { generatorProducts } = require("../../utils/generatorFaker");

module.exports = function () {
  async function list(cant = 5) {
    const products = [];
    for (let i = 0; i < cant; i++) {
      products.push(generatorProducts());
    }
    return products;
  }

  return { list };
};

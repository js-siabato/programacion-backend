module.exports = {
  api: {
    port: process.env.API_PORT || 8080,
  },
  data: {
    products: process.env.DATA_PRODUCTS || "data/products.txt",
    messages: process.env.DATA_MESSAGES || "data/messages.txt",
    carts: process.env.DATA_CARTS || "data/carts.txt",
  },
  rol: {
    administrator: process.env.ADMINISTRATOR || true,
  },
};

module.exports = {
  api: {
    port: process.env.API_PORT || 8080,
  },
  data: {
    products: "data/products.txt",
    messages: "data/messages.txt",
    cards: "data/cards.txt",
  },
  rol: {
    administrator: true,
  },
};

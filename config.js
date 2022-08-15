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
  DB: {
    clientProduct: process.env.CLIENT_DB_PRODUCTS || "mysql",
    clientMessages: process.env.CLIENT_DB_MESSAGES || "sqlite3",
  },
  mariaDB: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "",
    database: process.env.MYSQL_DB || "ecommerce",
  },
  sqliteDB: {
    file: process.env.FILE_NAME || "./DB/ecommerce.sqlite",
  },
};

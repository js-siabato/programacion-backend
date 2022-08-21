module.exports = {
  api: {
    port: process.env.API_PORT || 8080,
  },
  rol: {
    administrator: process.env.ADMINISTRATOR || true,
  },
  DB: {
    remoteDB: process.env.REMOTE_DB || true,
    clientProduct: process.env.CLIENT_DB_PRODUCTS || "mongoDB",
    clientMessages: process.env.CLIENT_DB_MESSAGES || "sqlite3",
    clientCarts: process.env.CLIENT_DB_CARTS || "mongoDB",
  },
  mariaDB: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "password",
    database: process.env.MYSQL_DB || "ecommerce",
  },
  sqliteDB: {
    file: process.env.FILE_NAME || "./DB/ecommerce.sqlite",
  },
  mongoDBLocal: {
    database: process.env.MONGODB_DB || "ecommerce",
  },
  mongoDBRemote: {
    user: process.env.MYSQL_USER || "jsiabato1",
    password: process.env.MYSQL_PASS || "Vz5EPVEoSfevTq1E",
    database: process.env.MONGODB_DB || "ecommerce",
  },
};

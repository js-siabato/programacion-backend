const { firestore } = require("firebase-admin");
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://programacion-backend-386e7.firebaseio.com",
});

async function list(table) {
  const query = admin.firestore().collection(table);
  var data = [];
  switch (table) {
    case "productos":
      await query
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            data.push({
              id: doc.id,
              nombre: doc.data().nombre,
              descripcion: doc.data().descripcion,
              precio: doc.data().precio,
              foto: doc.data().foto,
              stock: doc.data().stock,
              timestamp: doc.data().timestamp.toDate(),
              codigo: doc.data().codigo,
            });
          });
        })
        .catch((err) => {
          console.log("Error consultando productos ", err);
        });
      break;
  }
  return data;
}

async function insert(table, products) {
  const query = admin.firestore().collection(table);
  let res = [];
  switch (table) {
    case "productos":
      await products.forEach(async (product) => {
        query
          .add({
            ...product,
            timestamp: firestore.Timestamp.fromDate(new Date()),
          })
          .then((result) => {
            res.push(result);
          })
          .catch((err) => {
            console.log("Error consultando productos ", err);
          });
      });
      break;
  }
  return res;
}

module.exports = {
  list,
  insert,
};

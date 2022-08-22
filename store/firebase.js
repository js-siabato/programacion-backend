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

  return data;
}

async function insert(table, data) {
  const query = admin.firestore().collection(table);

  data.forEach(async (doc) => {
    await query
      .add({
        ...doc,
        timestamp: firestore.Timestamp.fromDate(new Date()),
      })
      .then((result) => {
        console.log("🚀 ~ Productos creados!!");
      })
      .catch((err) => {
        console.log("Error consultando productos ", err);
      });
  });

  return true;
}

async function get(table, id) {
  const query = admin.firestore().collection(table);
  var data;

  await query
    .doc(id)
    .get()
    .then((result) => {
      data = {
        id: result.id,
        nombre: result.data().nombre,
        descripcion: result.data().descripcion,
        precio: result.data().precio,
        foto: result.data().foto,
        stock: result.data().stock,
        timestamp: result.data().timestamp.toDate(),
        codigo: result.data().codigo,
      };
    })
    .catch((err) => {
      console.log("Error consultando producto ", err);
    });

  return data;
}

async function updateProduct(table, id, body) {
  const query = admin.firestore().collection(table);
  var data;

  await query
    .doc(id)
    .update({
      nombre: body.nombre,
      descripcion: body.descripcion,
      precio: body.precio,
      foto: body.foto,
      stock: body.stock,
      timestamp: firestore.Timestamp.fromDate(new Date()),
      codigo: body.codigo,
    })
    .then((result) => {
      data = result;
    })
    .catch((err) => {
      data = false;
    });

  return data;
}

async function remove(table, id) {
  const query = admin.firestore().collection(table);
  var data;
  let doc = await query.doc(id).get();

  if (!doc.data()) {
    console.log("TEST");
    return false;
  }

  await query
    .doc(id)
    .delete()
    .then((result) => {
      data = result;
    })
    .catch((err) => {
      data = false;
    });

  return data;
}

module.exports = {
  list,
  insert,
  get,
  updateProduct,
  remove,
};

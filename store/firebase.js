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
    case "mensajes":
      await query.get().then((snapshot) =>
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            email: doc.data().email,
            timestamp: doc.data().timestamp.toDate(),
            mensaje: doc.data().mensaje,
          });
        })
      );
      break;
  }

  return data;
}

async function insert(table, info) {
  const query = admin.firestore().collection(table);
  var data;

  switch (table) {
    case "productos":
      data = [];
      data.push(
        info.forEach(async (doc) => {
          await query
            .add({
              ...doc,
              timestamp: firestore.Timestamp.fromDate(new Date()),
            })
            .then((result) => {
              return result;
            })
            .catch((err) => {
              console.log("Error creando productos ", err);
            });
        })
      );
      break;
    case "carritos":
      const doc = query.doc();
      data = await doc
        .create({
          timestamp: firestore.Timestamp.fromDate(new Date()),
          productos: [],
        })
        .then((result) => {
          return doc.id;
        })
        .catch((err) => {
          console.log("Error creando carrito ", err);
        });
      break;
    case "mensajes":
      const docM = query.doc();
      data = await docM
        .create({
          timestamp: firestore.Timestamp.fromDate(new Date()),
          ...info,
        })
        .then((result) => {
          return docM.id;
        })
        .catch((err) => {
          console.log("Error creando mensaje ", err);
        });
      break;
  }

  return data;
}

async function get(table, id) {
  const query = admin.firestore().collection(table);
  var data;

  switch (table) {
    case "productos":
      data = await query
        .doc(id)
        .get()
        .then((result) => {
          return {
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
      break;
    case "carritos":
      data = await query
        .doc(id)
        .get()
        .then((result) => {
          return result.data();
        })
        .catch((err) => {
          console.log("Error consultando productos del carrito ", err);
        });
      break;
  }

  return data;
}

async function update(table, id, body) {
  const query = admin.firestore().collection(table);
  var data;

  switch (table) {
    case "productos":
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
      break;
    case "carritos":
      await query
        .doc(id)
        .update({
          productos: firestore.FieldValue.arrayUnion(body),
        })
        .then(async (result) => {
          const res = await query.doc(id).get();
          data = {
            id: res.id,
            timestamp: res.data().timestamp.toDate(),
            productos: res.data().productos,
          };
        })
        .catch((err) => {
          console.log("Error agregando producto al carrito ", err);
        });
      break;
  }

  return data;
}

async function remove(table, id) {
  const query = admin.firestore().collection(table);
  var data;
  let doc = await query.doc(id).get();

  if (!doc.data()) {
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

async function removeProductCart(table, idCart, itemToRemove) {
  const query = admin.firestore().collection(table);
  var data;

  await query
    .doc(idCart)
    .update({
      productos: firestore.FieldValue.arrayRemove(itemToRemove),
    })
    .then(async (result) => {
      const res = await query.doc(idCart).get();
      data = {
        id: res.id,
        timestamp: res.data().timestamp.toDate(),
        productos: res.data().productos,
      };
    })
    .catch((err) => {
      console.log("Error eliminando producto del carrito ", err);
    });

  return data;
}

module.exports = {
  list,
  insert,
  get,
  update,
  remove,
  removeProductCart,
};

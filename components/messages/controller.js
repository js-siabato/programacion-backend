const { normalizeMessages } = require("../../normalize/messages");

const TABLE = "mensajes";

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function list() {
    const result = await store.list(TABLE);
    if (!result.length) {
      return { resultado: "No se encontraron mensajes." };
    }
    return result;
  }

  async function insert(body) {
    const dataNormalize = normalizeMessages({ id: "messages", body });
    console.log("🚀 ~ dataNormalize", JSON.stringify(dataNormalize));
    // const result = await store.insert(TABLE, body);

    // if (result) {
    //   return {
    //     resultado: "Mensaje agregado exitosamente.",
    //     idMensaje: result,
    //   };
    // } else {
    //   return {
    //     ERROR: "No se agrego el mensaje.",
    //   };
    // }
  }

  return { list, insert };
};

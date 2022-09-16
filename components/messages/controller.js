const { normalize, schema } = require("normalizr");

const schemaAuthor = new schema.Entity("author", {}, { idAttribute: "email" });

const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "id" }
);

const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const TABLE = "mensajes";

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function list() {
    const result = await store.list(TABLE);

    if (!result.length) {
      return { resultado: "No se encontraron mensajes." };
    }

    const mensajesNormalize = { id: "mensajes", mensajes: result };
    const normalizedMessages = normalize(mensajesNormalize, schemaMensajes);
    return normalizedMessages;
  }

  async function insert(body) {
    const mensajes = await store.list(TABLE);

    let id = mensajes.length ? mensajes[mensajes.length - 1].id + 1 : 1;
    const result = await store.insert(TABLE, { ...body, id: id });

    if (result) {
      return {
        resultado: "Mensaje agregado exitosamente.",
        mensajes: await list(),
      };
    } else {
      return {
        ERROR: "No se agrego el mensaje.",
      };
    }
  }

  return { list, insert };
};

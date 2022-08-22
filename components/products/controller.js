const CodeGenerator = require("node-code-generator");
const TABLE = "productos";

const generator = new CodeGenerator();

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function list() {
    const result = await store.list(TABLE);
    if (!result.length) {
      return { resultado: "No se encontraron productos." };
    }
    return result;
  }

  async function get(id) {
    const result = await store.get(TABLE, id);

    if (!result) {
      return { error: "Producto no encontrado!!" };
    }
    return result;
  }

  async function insert(body) {
    for (let i = 0; i < body.length; i++) {
      body[i].codigo = generator.randomChars(body[i].nombre, 8).toUpperCase();
    }
    const result = await store.insert(TABLE, body);

    if (result) {
      return {
        resultado: "Producto(s) creado(s) exitosamente.",
        productos: await store.list(TABLE),
      };
    } else {
      return {
        ERROR: "No se crearon los producto(s).",
      };
    }
  }

  async function update(id, body) {
    const result = await store.update(TABLE, id, body);

    if (result) {
      return {
        resultado: "Producto actualizado exitosamente.",
        productos: await store.get(TABLE, id),
      };
    } else {
      return {
        ERROR: "Producto no encontrado!!",
      };
    }
  }

  async function remove(id) {
    const result = await store.remove(TABLE, id);

    if (result) {
      return {
        resultado: "Producto eliminado exitosamente.",
      };
    } else {
      return {
        ERROR: "Producto no encontrado!!",
      };
    }
  }

  return { list, get, insert, update, remove };
};

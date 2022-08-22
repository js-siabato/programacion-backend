const TABLE = "carritos";

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function insert() {
    const result = await store.insert(TABLE, { productos: [] });

    if (result) {
      return {
        resultado: "Carrito creado exitosamente!!",
        idCarrito: result,
      };
    } else {
      return {
        ERROR: "No se creo el carrito!!",
      };
    }
  }

  async function remove(id) {
    const result = await store.remove(TABLE, id);

    if (result) {
      return {
        resultado: "Carrito eliminado exitosamente.",
      };
    } else {
      return {
        ERROR: "Carrito no encontrado!!",
      };
    }
  }

  async function listCart(id) {
    const cart = await store.get(TABLE, id);

    if (!cart) {
      return { Error: "Carrito no encontrado!!" };
    }

    if (!cart.productos.length) {
      return { Info: "Carrito vacio!!" };
    }
    return cart.productos;
  }

  async function insertProductsCart(id, body) {
    const cart = await store.get(TABLE, id);
    const product = await store.get("productos", body.id_prod);

    if (!cart) {
      return { Error: "Carrito no encontrado!!" };
    } else if (!product) {
      return { Error: "Producto no encontrado!!" };
    }

    return await store.update(TABLE, id, product);
  }

  async function removeProductCart(idCart, idProd) {
    const cart = await store.get(TABLE, idCart);
    if (!cart) {
      return { Error: "Carrito no encontrado!!" };
    }

    const product = cart.productos.find(
      (producto) => producto._id == idProd || producto.id == idProd
    );
    if (!product) {
      return { Error: "Producto no encontrado!!" };
    }

    return await store.removeProductCart(TABLE, idCart, product);
  }

  return { insert, remove, listCart, insertProductsCart, removeProductCart };
};

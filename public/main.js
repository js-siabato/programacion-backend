const socket = io.connect();

window.onload = function render() {
  fetch("http://localhost:8080/api/productos", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      renderProduct(json);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });

  fetch("http://localhost:8080/api/mensajes", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      renderMessages(json);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
};

function renderProduct(products) {
  let html = "";
  if (!products.resultado) {
    html = `<div class="table-responsive">
            <table class="table table-sm table-hover table-striped">
                <thead class="t-head-light">
                    <tr class="p__md--strong center">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha de creación/modificación</th>
                        <th>Stock</th>
                        <th>Código</th>
                        <th>Precio</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody class="center" id="row">
                    ${products
                      .map((product) => {
                        const date = new Date(
                          product.timestamp
                        ).toLocaleString();
                        return `<tr id="row">
                                  <td>
                                    ${product.nombre}
                                  </td>
                                  <td>
                                    ${product.descripcion}
                                  </td>
                                  <td>
                                    ${date}
                                  </td>
                                  <td>
                                    ${product.stock}
                                  </td>
                                  <td>
                                    ${product.codigo}
                                  </td>
                                  <td>
                                    $ ${product.precio}
                                  </td>
                                  <td>
                                    <img src="${product.foto}" width="50" height="50">
                                  </td>
                                </tr>`;
                      })
                      .join(" ")}
                </tbody>
            </table>
          </div>`;
  } else {
    html = `<h3 class="alert alert-danger">No se encontraron productos</h1>`;
  }
  document.getElementById("table").innerHTML = html;
}

function renderMessages(messages) {
  let html = "";
  if (!messages.resultado) {
    html = messages
      .map((message) => {
        var numberOfMlSeconds = new Date(message.timestamp).getTime();
        // El valor de 5 depende de las horas de diferencia del horario UTC.
        var addMlSeconds = 5 * 60 * 60000;
        var newDate = new Date(numberOfMlSeconds - addMlSeconds);

        return `<div>
                <strong style="color:blue">${message.email}</strong>
                <h9 style="color:brown">[${newDate.toLocaleString()}]</h9>:
                <em style="color:green">${message.mensaje}</em> </div>`;
      })
      .join(" ");
  } else {
    html = `<h3 class="alert alert-danger">No hay mensajes</h1>`;
  }
  document.getElementById("messages").innerHTML = html;
}

function addProduct(e) {
  const form = document.getElementById("productonuevo");
  const product = {
    nombre: document.getElementById("name").value,
    descripcion: document.getElementById("description").value,
    foto: document.getElementById("phone").value,
    precio: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
  };

  fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: `[${JSON.stringify(product)}]`,
  })
    .then((response) => response.json())
    .then((json) => {
      socket.emit("newProduct", json.productos);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });

  form.reset();
  return false;
}

function addMessage(e) {
  const form = document.getElementById("newMessage");
  const message = {
    email: document.getElementById("email").value,
    mensaje: document.getElementById("message").value,
  };

  fetch("http://localhost:8080/api/mensajes", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .then((json) => {
      socket.emit("newMessage", json.mensajes);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });

  form.reset();
  return false;
}

socket.on("products", (data) => {
  renderProduct(data);
});

socket.on("messages", (messages) => {
  renderMessages(messages);
});

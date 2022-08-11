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
};

function renderProduct(data) {
  let html = "";
  if (!data.resultado) {
    html = `<div class="table-responsive">
            <table class="table table-sm table-hover table-striped">
                <thead class="t-head-light">
                    <tr class="p__md--strong center">
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Código</th>
                        <th>Precio</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody class="center" id="row">
                    ${data
                      .map((product) => {
                        return `<tr id="row">
                                  <td>
                                    ${product.nombre}
                                  </td>
                                  <td>
                                    ${product.descripcion}
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
  const html = messages
    .map((elem) => {
      return `<div>
              <strong style="color:blue">${elem.email}</strong>
              <h9 style="color:brown">[${elem.date}]</h9>:
              <em style="color:green">${elem.text}</em> </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

function addProduct(e) {
  const product = {
    nombre: document.getElementById("name").value,
    descripcion: document.getElementById("description").value,
    foto: document.getElementById("phone").value,
    precio: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
  };
  const form = document.getElementById("productonuevo");
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
  const info = new Date();
  const message = {
    email: document.getElementById("email").value,
    date: info.toLocaleString(),
    text: document.getElementById("message").value,
  };
  socket.emit("newMessage", message);
  form.reset();
  return false;
}

socket.on("products", (data) => {
  renderProduct(data);
});

socket.on("messages", (messages) => {
  renderMessages(messages);
});

const socket = io.connect();

function renderProduct(data) {
  const html = data
    .map((product) => {
      return `<tr>
                <td>
                  ${product.title}
                </td>
                <td>
                  $ ${product.price}
                </td>
                <td>
                  <img src="${product.thumbnail}" width="50" height="50">
                </td>
              </tr>`;
    })
    .join(" ");
  document.getElementById("row").innerHTML = html;
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
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  const form = document.getElementById("productonuevo");
  fetch("http://localhost:8080/api/productos", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("🚀 ~ file: main.js ~ line 53 ~ .then ~ json", json);
      socket.emit("newProduct", json);
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

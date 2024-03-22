fetch("http://localhost:3000/api/orders")
  .then((result) => result.json())
  .then((json) => {
    console.log(json);
    const fragment = document.createDocumentFragment();
    json.forEach((order) => {
      const div = document.createElement("div");
      const divider = document.createElement("p");
      divider.innerHTML = "--------------------------------";
      const priceParagraph = document.createElement("p");
      const statusParagraph = document.createElement("p");
      const number = document.createElement("p");
      priceParagraph.innerHTML = `Total de la orden: ${order.totalPrice}`;
      statusParagraph.innerHTML = `Estado: ${order.status}`;
      number.innerHTML = `Numero de orden: ${order.number}`;
      div.appendChild(number);
      div.appendChild(priceParagraph);
      div.appendChild(statusParagraph);
      div.appendChild(divider);
      fragment.appendChild(div);
    });
    const ordersContainer = document.getElementById("orders");
    ordersContainer.appendChild(fragment);
  });

const ordersContainer = document.getElementById("orders");
const addOrderBtn = document.getElementById("addOrderBtn");
const readyContainer = document.getElementById("ready");

let orderId = 1;

function renderOrder(order) {
  const orderElement = document.createElement("div");

  orderElement.classList.add("order");
  orderElement.classList.add(
    order.status === "Completado"
      ? "completed"
      : "processing"
  );

  orderElement.id = `order-${order.id}`;

  orderElement.innerHTML = `
    <h3>Pedido #${order.id}</h3>
    <p>Estado: ${order.status}</p>
  `;

  return orderElement;
}

function updateOrderStatus(order) {

  const orderElement = document.getElementById(`order-${order.id}`);

  orderElement.className = "order";

  if (order.status === "Completado") {
    orderElement.classList.add("completed");
    readyContainer.appendChild(orderElement);

  } else {
    orderElement.classList.add("processing");

  }

  orderElement.innerHTML = `
    <h3>Pedido #${order.id}</h3>
    <p>Estado: ${order.status}</p>
  `;
}

function prepareOrder(order) {
  return new Promise((resolve) => {

    const preparationTime =
      Math.floor(Math.random() * 25000) / 3;

    setTimeout(() => {

      order.status = "Completado";

      resolve(order);

    }, preparationTime);

  });
}


async function handleNewOrder() {

  const order = {
    id: orderId++,
    status: "En Proceso"
  };

  const orderElement = renderOrder(order);
  ordersContainer.appendChild(orderElement);

  console.log(`Pedido #${order.id} recibido`);

  await prepareOrder(order);

  updateOrderStatus(order);

  console.log(`Pedido #${order.id} completado`);
}

addOrderBtn.addEventListener(
  "click",
  handleNewOrder
);
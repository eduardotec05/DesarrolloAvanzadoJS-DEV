const orderList = document.getElementById("orderList");
const addOrderBtn = document.getElementById("addOrderBtn");

let orderId = 1; // Para identificar los pedidos

addOrderBtn.addEventListener("click", () => {
  const order = { id: orderId++, status: "En Proceso" };
  addOrder(order);
  processOrder(order);
});

function addOrder(order) {
  const listItem = document.createElement("li");
  listItem.id = `order-${order.id}`;
  listItem.textContent = `Pedido #${order.id}: ${order.status}`;
  orderList.appendChild(listItem);
}

function updateOrderStatus(order, status) {
  const listItem = document.getElementById(`order-${order.id}`);
  if (listItem) {
    listItem.textContent = `Pedido #${order.id}: ${status}`;
  }
}

async function processOrder(order) {
  updateOrderStatus(order, "En Proceso");
  /*usar tiempos random para simular proceso de pedido*/
  await new Promise((resolve) => setTimeout(resolve, 1000));
  updateOrderStatus(order, "En Cola");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  updateOrderStatus(order, "En Preparación");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  updateOrderStatus(order, "Completado");
}

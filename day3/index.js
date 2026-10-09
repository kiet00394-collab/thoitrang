const form = document.querySelector("#order-form");
const tableBody = document.querySelector("#orders-body");
const count = document.querySelector("#order-count");
const error = document.querySelector("#error");
const orders = [];
const money = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });

function renderOrders() {
  tableBody.replaceChildren();
  count.textContent = `${orders.length} đơn`;
  if (orders.length === 0) {
    const row = document.createElement("tr");
    row.className = "empty";
    const cell = document.createElement("td");
    cell.colSpan = 9;
    cell.textContent = "Chưa có sản phẩm. Điền thông tin phía trên để bắt đầu.";
    row.append(cell);
    tableBody.append(row);
    return;
  }

  orders.forEach((order, index) => {
    const row = document.createElement("tr");
    const values = [index + 1, order.customer, order.code, order.name, order.quantity, `${money.format(order.price)} ₫`, `${money.format(order.amount)} ₫`, `${money.format(order.discount)} ₫`, `${money.format(order.total)} ₫`];
    values.forEach((value, cellIndex) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (cellIndex === 8) cell.className = "total";
      row.append(cell);
    });
    tableBody.append(row);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const customer = form.querySelector("#customer").value.trim();
  const code = form.querySelector("#product-code").value.trim();
  const name = form.querySelector("#product-name").value.trim();
  const quantity = Number(form.querySelector("#quantity").value);
  const price = Number(form.querySelector("#price").value);
  if (!customer || !code || !name || !Number.isInteger(quantity) || quantity < 1 || !Number.isFinite(price) || price <= 0) {
    error.textContent = "Vui lòng nhập đủ thông tin; số lượng và đơn giá phải lớn hơn 0.";
    return;
  }

  const amount = quantity * price;
  const discount = amount * 0.15;
  orders.push({ customer, code, name, quantity, price, amount, discount, total: amount - discount });
  error.textContent = "";
  renderOrders();
  form.reset();
  form.querySelector("#customer").focus();
});

form.addEventListener("reset", () => { error.textContent = ""; });
document.querySelector("#show-orders").addEventListener("click", renderOrders);
renderOrders();
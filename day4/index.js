const products = [
  { id: "w1", name: "Quần jean ống đứng", type: "Nữ", category: "women", price: 269000, image: "public/bai1.png", tag: "DỄ PHỐI" },
  { id: "w2", name: "Áo khoác dáng ngắn", type: "Nữ", category: "women", price: 249000, image: "public/forwomen.jpeg", tag: "MỚI" },
  { id: "w3", name: "Áo phông cotton mềm", type: "Nữ", category: "women", price: 159000, image: "public/images.jpeg", tag: "BÁN CHẠY" },
  { id: "m1", name: "Quần short khaki", type: "Nam", category: "men", price: 250000, image: "public/nam1.jpeg", tag: "NHẸ NHÀNG" },
  { id: "m2", name: "Quần baggy tối giản", type: "Nam", category: "men", price: 398000, image: "public/nam2.jpeg", tag: "MỚI" },
  { id: "m3", name: "Short cotton thoải mái", type: "Nam", category: "men", price: 300000, image: "public/nam3.jpeg", tag: "DỄ PHỐI" },
  { id: "m4", name: "Quần casual hằng ngày", type: "Nam", category: "men", price: 300000, image: "public/images 2.jpeg", tag: "BÁN CHẠY" }
];

const grid = document.querySelector("#product-grid");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const count = document.querySelector("#cart-count");
const cartButton = document.querySelector("#cart-button");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const money = new Intl.NumberFormat("vi-VN");
let selectedCategory = "all";
let cartCount = 0;
let toastTimer;

function visibleProducts() {
  const query = search.value.trim().toLocaleLowerCase("vi");
  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = `${product.name} ${product.type}`.toLocaleLowerCase("vi").includes(query);
    return matchesCategory && matchesSearch;
  });
  if (sort.value === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort.value === "high") filtered.sort((a, b) => b.price - a.price);
  return filtered;
}

function renderProducts() {
  const shown = visibleProducts();
  grid.replaceChildren();
  resultCount.textContent = `${shown.length} sản phẩm`;
  emptyState.hidden = shown.length > 0;

  shown.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `<div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-tag">${product.tag}</span></div><div class="product-info"><h3>${product.name}</h3><p>${money.format(product.price)}₫</p><span class="product-kind">Thời trang ${product.type.toLowerCase()}</span><button class="add-button" type="button" aria-label="Thêm ${product.name} vào giỏ">+</button></div>`;
    card.querySelector(".add-button").addEventListener("click", () => addToCart(product));
    grid.append(card);
  });
}

function addToCart(product) {
  cartCount += 1;
  count.textContent = String(cartCount);
  cartButton.setAttribute("aria-label", `Giỏ hàng, ${cartCount} sản phẩm`);
  toast.textContent = `Đã thêm ${product.name} vào giỏ.`;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderProducts();
  });
});

document.querySelectorAll("[data-nav-category]").forEach((link) => {
  link.addEventListener("click", () => {
    const filter = document.querySelector(`[data-filter="${link.dataset.navCategory}"]`);
    filter.click();
  });
});

search.addEventListener("input", renderProducts);
sort.addEventListener("change", renderProducts);
cartButton.addEventListener("click", () => {
  toast.textContent = cartCount ? `Trong giỏ hiện có ${cartCount} sản phẩm.` : "Giỏ hàng đang trống.";
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
});

renderProducts();
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="price">${item}</div>
    `;

    container.appendChild(div);
  });
}

function removeItem(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => i !== item);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.addEventListener("DOMContentLoaded", loadCart);

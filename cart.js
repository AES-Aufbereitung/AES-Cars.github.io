function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* 🛒 Zähler oben in der Navigation */
function updateCartCount() {
  let cart = getCart();
  const counter = document.getElementById("cart-count");

  if (counter) {
    counter.textContent = cart.length;
  }
}

/* ➕ / ➖ Button Logik */
function addToCart(item, btn) {
  let cart = getCart();

  const index = cart.indexOf(item);

  if (index === -1) {
    cart.push(item);
    saveCart(cart);

    if (btn) {
      btn.classList.add("active", "flash");
      btn.textContent = "Im Warenkorb ✓";

      setTimeout(() => btn.classList.remove("flash"), 400);
    }

  } else {
    cart.splice(index, 1);
    saveCart(cart);

    if (btn) {
      btn.classList.remove("active");
      btn.textContent = "+ Hinzufügen";
    }
  }

  updateCartCount();
}

/* 🔄 Buttons beim Laden synchronisieren */
function syncButtons() {
  let cart = getCart();

  document.querySelectorAll(".add-btn").forEach(btn => {
    const item = btn.dataset.item;

    if (cart.includes(item)) {
      btn.classList.add("active");
      btn.textContent = "Im Warenkorb ✓";
    } else {
      btn.classList.remove("active");
      btn.textContent = "+ Hinzufügen";
    }
  });
}

/* 🚀 Beim Laden starten */
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  syncButtons();
});

<script>
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
      <button class="add-btn" onclick="removeItem('${item}')">
        Entfernen
      </button>
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
</script>

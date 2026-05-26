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

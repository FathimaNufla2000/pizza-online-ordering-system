// Handles "Add to Cart" on the menu page, and full cart rendering/checkout on the cart page.

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const { id, name, price, image } = btn.dataset;
      addToCart({ id, name, price: Number(price), image });
      btn.textContent = 'Added ✓';
      setTimeout(() => (btn.textContent = 'Add to Cart'), 1200);
    });
  });
});

function renderCartPage() {
  const cart = getCart();
  const emptyEl = document.getElementById('cartEmpty');
  const contentEl = document.getElementById('cartContent');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (!emptyEl || !contentEl) return;

  if (cart.length === 0) {
    emptyEl.hidden = false;
    contentEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  contentEl.hidden = false;

  itemsEl.innerHTML = cart.map((item) => `
    <tr data-id="${item.id}">
      <td>${item.name}</td>
      <td>Rs. ${item.price.toLocaleString('en-LK')}</td>
      <td>
        <div class="qty-controls">
          <button type="button" class="qty-dec">−</button>
          <span>${item.qty}</span>
          <button type="button" class="qty-inc">+</button>
        </div>
      </td>
      <td>Rs. ${(item.price * item.qty).toLocaleString('en-LK')}</td>
      <td><button type="button" class="remove-item">Remove</button></td>
    </tr>
  `).join('');

  totalEl.textContent = cartTotal(cart).toLocaleString('en-LK');

  itemsEl.querySelectorAll('tr').forEach((row) => {
    const id = row.dataset.id;
    row.querySelector('.qty-inc').addEventListener('click', () => { updateQty(id, 1); renderCartPage(); });
    row.querySelector('.qty-dec').addEventListener('click', () => { updateQty(id, -1); renderCartPage(); });
    row.querySelector('.remove-item').addEventListener('click', () => { removeFromCart(id); renderCartPage(); });
  });

  const form = document.getElementById('checkoutForm');
  if (form && !form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', handleCheckout);
  }
}

async function handleCheckout(e) {
  e.preventDefault();
  const errorEl = document.getElementById('checkoutError');
  errorEl.hidden = true;

  const cart = getCart();
  if (cart.length === 0) return;

  const payload = {
    customer_name: document.getElementById('customer_name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    address: document.getElementById('address').value.trim(),
    items: cart,
    total: cartTotal(cart)
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');
    window.location.href = `/order-confirmation/${data.orderId}`;
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.hidden = false;
  }
}

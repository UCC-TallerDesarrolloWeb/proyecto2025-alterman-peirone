document.addEventListener("DOMContentLoaded", () => {
  // --- Menú desplegable (tu código existente) ---
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("activo");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove("activo");
      }
    });
  }

  // --- Carrito persistente y compatible con todas las páginas ---
  const STORAGE_KEY = 'crewlab_carrito';
  let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    updateCartBadge();
  }

  // Si no existe el modal en la página, lo creamos dinámicamente
  let carritoModal = document.getElementById('carrito-modal');
  if (!carritoModal) {
    carritoModal = document.createElement('div');
    carritoModal.id = 'carrito-modal';
    carritoModal.className = 'carrito-modal oculto';
    carritoModal.innerHTML = `
      <h2>Tu carrito 🛒</h2>
      <ul id="carrito-lista"></ul>
      <p id="carrito-total">Total: $0</p>
      <button id="cerrar-carrito">Cerrar</button>
    `;
    document.body.appendChild(carritoModal);
  }

  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');
  const cerrarCarritoBtn = document.getElementById('cerrar-carrito');

  const carritoIcon = document.querySelector('.carrito');
  if (carritoIcon) {
    carritoIcon.style.cursor = 'pointer';
    carritoIcon.addEventListener('click', () => {
      carritoModal.classList.toggle('oculto');
      renderCart();
    });
  }

  if (cerrarCarritoBtn) {
    cerrarCarritoBtn.addEventListener('click', () => {
      carritoModal.classList.add('oculto');
    });
  }

  // Delegación: detecta clicks en botones .add-to-cart aunque estén en otras páginas
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart');
    if (addBtn) {
      // obtener nombre y precio de data-attributes o buscar en el card
      let nombre = addBtn.dataset.nombre;
      let precio = addBtn.dataset.precio;

      const card = addBtn.closest('.producto');
      if (!nombre && card) {
        const h2 = card.querySelector('h2');
        nombre = h2 ? h2.textContent.trim() : 'Producto';
      }

      if (!precio && card) {
        const p = card.querySelector('p');
        precio = p ? parsePrice(p.textContent) : 0;
      }

      // parsing seguro: sacar todo lo que no sean dígitos
      precio = precio !== undefined && precio !== null ? parseInt(String(precio).replace(/[^\d]/g, '')) || 0 : 0;
      addToCart({ nombre: nombre || 'Producto', precio: precio, cantidad: 1 });
      saveCart();
      renderCart();
      return; // stop further processing of this click
    }

    // botones dentro del modal: eliminar / + / -
    const eliminarBtn = e.target.closest('.eliminar');
    if (eliminarBtn) {
      const idx = Number(eliminarBtn.dataset.index);
      if (!Number.isNaN(idx)) {
        carrito.splice(idx, 1);
        saveCart();
        renderCart();
      }
    }

    const masBtn = e.target.closest('.cantidad-mas');
    if (masBtn) {
      const idx = Number(masBtn.dataset.index);
      if (!Number.isNaN(idx)) {
        carrito[idx].cantidad++;
        saveCart();
        renderCart();
      }
    }

    const menosBtn = e.target.closest('.cantidad-menos');
    if (menosBtn) {
      const idx = Number(menosBtn.dataset.index);
      if (!Number.isNaN(idx)) {
        carrito[idx].cantidad = Math.max(1, carrito[idx].cantidad - 1);
        saveCart();
        renderCart();
      }
    }
  });

  function addToCart(product) {
    const existente = carrito.find(i => i.nombre === product.nombre);
    if (existente) existente.cantidad += product.cantidad;
    else carrito.push({ ...product });
  }

  function renderCart() {
    if (!carritoLista) return;
    carritoLista.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio * item.cantidad;
      const li = document.createElement('li');
      li.className = 'carrito-item';
      li.innerHTML = `
        <div class="item-info">
          <strong class="item-nombre">${escapeHtml(item.nombre)}</strong>
          <div class="item-precio">$${item.precio}</div>
        </div>
        <div class="item-ctrls">
          <button class="cantidad-menos" data-index="${index}">-</button>
          <span class="cantidad">${item.cantidad}</span>
          <button class="cantidad-mas" data-index="${index}">+</button>
          <button class="eliminar" data-index="${index}">Eliminar</button>
        </div>
      `;
      carritoLista.appendChild(li);
    });

    carritoTotal.textContent = `Total: $${total}`;
    updateCartBadge();
  }

  function updateCartBadge() {
    const count = carrito.reduce((s, i) => s + i.cantidad, 0);
    if (!carritoIcon) return;
    let badge = carritoIcon.querySelector('.carrito-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'carrito-badge';
      carritoIcon.appendChild(badge);
    }
    badge.textContent = count > 0 ? count : '';
  }

  function parsePrice(text) {
    if (!text) return 0;
    // extrae números de la cadena (ej: "$30.000" -> "30000")
    const digits = text.replace(/[^\d]/g, '');
    return parseInt(digits) || 0;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"'`=\/]/g, (s) => {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'}[s];
    });
  }

  // inicial
  renderCart();

  // guardar antes de salir (por si acaso)
  window.addEventListener('beforeunload', saveCart);
});

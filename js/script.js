"use strict";

/** Clave usada en localStorage para persistir el carrito. */
const STORAGE_KEY = "crewlab_carrito";
/** Formateador de números para Argentina. */
const fmtAR = new Intl.NumberFormat("es-AR");

/**
 * Lee el carrito desde localStorage.
 * @returns {Array<{nombre:string, precio:number, cantidad:number}>}
 */
const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/**
 * Guarda el carrito y actualiza el badge.
 * @param {Array<{nombre:string, precio:number, cantidad:number}>} currentCart
 * @returns {void}
 */
const saveCart = (currentCart) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCart));
  } catch {/* ignorar errores de cuota */}
  updateCartBadge(currentCart);
};

/**
 * Actualiza el contador del ícono de carrito.
 * @param {Array<{cantidad:number}>} [currentCart]
 * @returns {void}
 */
const updateCartBadge = (currentCart) => {
  const carritoIcon = document.querySelector(".carrito");
  if (!carritoIcon) return;

  const count = (currentCart || loadCart()).reduce(
    (s, i) => s + Number(i.cantidad || 0),
    0
  );

  let badge = carritoIcon.querySelector(".carrito-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "carrito-badge";
    badge.setAttribute("role", "status");
    badge.setAttribute("aria-live", "polite");
    carritoIcon.appendChild(badge);
  }

  badge.textContent = count > 0 ? String(count) : "";
  carritoIcon.setAttribute(
    "aria-label",
    count > 0 ? `Carrito: ${count} artículos` : "Carrito vacío"
  );
};

/**
 * Dibuja la lista del carrito y muestra el total.
 * @returns {void}
 */
const renderCart = () => {
  const currentCart = loadCart();
  const lista = document.getElementById("carrito-lista");
  const totalEl = document.getElementById("carrito-total");
  if (!lista || !totalEl) return;

  lista.innerHTML = "";
  let total = 0;

  currentCart.forEach((item, index) => {
    const precio = Number(item.precio || 0);
    const cant = Math.max(1, Number(item.cantidad || 1));
    const subtotal = precio * cant;
    total += subtotal;

    const li = document.createElement("li");
    li.className = "carrito-item";
    li.innerHTML = `
      <span class="item-info">${item.nombre}</span>
      <span class="item-ctrls">
        <button class="cantidad-menos" data-index="${index}" aria-label="Disminuir cantidad">-</button>
        <span class="cantidad" aria-live="polite">${cant}</span>
        <button class="cantidad-mas" data-index="${index}" aria-label="Aumentar cantidad">+</button>
        <button class="eliminar-item" data-index="${index}" aria-label="Eliminar del carrito">❌</button>
      </span>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: $${fmtAR.format(total)}`;
  updateCartBadge(currentCart);
};

/**
 * Agrega un ítem al carrito (si existe, suma cantidades).
 * @param {{nombre:string, precio:number, cantidad:number}} item
 * @returns {void}
 */
const addToCart = (item) => {
  const limpio = {
    nombre: String(item?.nombre ?? "").trim(),
    precio: Number(item?.precio ?? 0),
    cantidad: Math.max(1, Number(item?.cantidad ?? 1)),
  };
  if (!limpio.nombre || !Number.isFinite(limpio.precio)) return;

  const carrito = loadCart();
  const existing = carrito.find((i) => i.nombre === limpio.nombre);
  if (existing) existing.cantidad += limpio.cantidad;
  else carrito.push(limpio);

  saveCart(carrito);
};

// Disponible globalmente si lo necesitás en otras páginas
window.addToCart = addToCart;

document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.setAttribute("aria-label", "Abrir menú de navegación");
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("activo");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove("activo");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Carrito modal
  const carritoIcon = document.querySelector(".carrito");
  const carritoModal = document.getElementById("carrito-modal");
  const btnCerrar = document.getElementById("cerrar-carrito");
  const finalizarCompraBtn = document.getElementById("finalizar-compra");
  const carritoLista = document.getElementById("carrito-lista");

  if (carritoModal) {
    carritoModal.setAttribute("role", "dialog");
    carritoModal.setAttribute("aria-modal", "true");
    carritoModal.setAttribute("aria-hidden", "true");
  }

  let lastFocus = null;

  /**
   * Abre el modal del carrito.
   * @returns {void}
   */
  const openCart = () => {
    if (!carritoModal) return;
    renderCart();
    lastFocus = document.activeElement;
    carritoModal.classList.remove("oculto");
    carritoModal.setAttribute("aria-hidden", "false");
    if (btnCerrar) btnCerrar.focus();
  };

  /**
   * Cierra el modal del carrito.
   * @returns {void}
   */
  const closeCart = () => {
    if (!carritoModal) return;
    carritoModal.classList.add("oculto");
    carritoModal.setAttribute("aria-hidden", "true");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  if (carritoIcon && carritoModal) {
    carritoIcon.setAttribute("tabindex", "0");
    carritoIcon.addEventListener("click", openCart);
    carritoIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCart();
      }
    });

    if (btnCerrar) btnCerrar.addEventListener("click", closeCart);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !carritoModal.classList.contains("oculto")) {
        closeCart();
      }
    });

    if (finalizarCompraBtn) {
      finalizarCompraBtn.addEventListener("click", () => {
        if (loadCart().length > 0) {
          window.location.href = "checkout.html";
        } else {
          alert("Tu carrito está vacío. ¡Añadí tu primera prenda!");
        }
      });
    }

    if (carritoLista) {
      carritoLista.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-index]");
        if (!btn) return;

        const idx = Number(btn.dataset.index);
        let carrito = loadCart();

        if (btn.classList.contains("eliminar-item")) {
          carrito.splice(idx, 1);
        } else if (btn.classList.contains("cantidad-mas")) {
          carrito[idx].cantidad += 1;
        } else if (btn.classList.contains("cantidad-menos")) {
          carrito[idx].cantidad = Math.max(1, Number(carrito[idx].cantidad) - 1);
        } else {
          return;
        }

        saveCart(carrito);
        renderCart();
      });
    }
  }

  // Badge inicial
  updateCartBadge(loadCart());
});

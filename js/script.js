const STORAGE_KEY = 'crewlab_carrito';

// ===================================================================
// FUNCIONES DE CARRITO GLOBALES (Accesibles desde cualquier página)
// Estas funciones SOLO manejan datos y la interfaz del modal/badge.
// ===================================================================

function loadCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCart(currentCart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCart));
  updateCartBadge(currentCart);
}

function updateCartBadge(currentCart) {
  const carritoIcon = document.querySelector('.carrito');
  if (!carritoIcon) return; // Se asegura que el icono existe antes de continuar

  const count = currentCart.reduce((s, i) => s + i.cantidad, 0);
  let badge = carritoIcon.querySelector('.carrito-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'carrito-badge';
    carritoIcon.appendChild(badge);
  }
  badge.textContent = count > 0 ? count : '';
}

function renderCart() {
  const currentCart = loadCart();
  const carritoLista = document.getElementById("carrito-lista");
  const carritoTotal = document.getElementById("carrito-total");
  if (!carritoLista || !carritoTotal) return; // Se asegura que los elementos del modal existen

  carritoLista.innerHTML = "";
  let total = 0;

  currentCart.forEach((item, index) => {
    total += item.precio * item.cantidad;
    const li = document.createElement("li");
    li.className = "carrito-item";
    
    li.innerHTML = `
      <span class="item-info">${item.nombre}</span>
      <span class="item-ctrls">
        <button class="cantidad-menos" data-index="${index}">-</button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="cantidad-mas" data-index="${index}">+</button>
        <button class="eliminar-item" data-index="${index}">❌</button>
      </span>
    `;
    carritoLista.appendChild(li);
  });

  carritoTotal.textContent = `Total: $${total.toLocaleString("es-AR")}`;
  updateCartBadge(currentCart);
}

/**
 * Función que añade un ítem al carrito y guarda.
 * Es la que llama productos.html
 */
function addToCart(item) {
    let carrito = loadCart();
    const existingItem = carrito.find(i => i.nombre === item.nombre);

    if (existingItem) {
        existingItem.cantidad += item.cantidad;
    } else {
        carrito.push(item);
    }
    
    saveCart(carrito);
}


// ===================================================================
// Lógica que se ejecuta cuando el DOM está completamente cargado
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Inicializar Menú ---
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


  // --- 2. Inicializar Eventos del Carrito (Asume que el modal HTML existe) ---
  const carritoIcon = document.querySelector('.carrito');
  const carritoModal = document.getElementById('carrito-modal');
  
  if (carritoIcon && carritoModal) {
    // Evento para MOSTRAR/OCULTAR el modal
    carritoIcon.addEventListener('click', () => {
      renderCart(); // Carga y dibuja el contenido antes de mostrar
      carritoModal.classList.toggle('oculto');
    });

    // Evento de CERRAR el modal
    const btnCerrar = document.getElementById('cerrar-carrito');
    if (btnCerrar) {
      btnCerrar.addEventListener('click', () => {
        carritoModal.classList.add('oculto');
      });
    }
    
    // Evento de FINALIZAR COMPRA
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    if (finalizarCompraBtn) {
      finalizarCompraBtn.addEventListener('click', () => {
        if (loadCart().length > 0) {
          window.location.href = 'checkout.html';
        } else {
          alert('Tu carrito está vacío. ¡Añade tu primera prenda!');
        }
      });
    }
  }


  // --- 3. Eventos de manipulación dentro del carrito (Añadir/Quitar) ---
  const carritoLista = document.getElementById("carrito-lista");
  if (carritoLista) {
    carritoLista.addEventListener("click", (e) => {
      if (e.target.dataset.index !== undefined) {
          let carrito = loadCart();
          const idx = Number(e.target.dataset.index);

          if (e.target.classList.contains("eliminar-item")) {
            carrito.splice(idx, 1);
          } else if (e.target.classList.contains("cantidad-mas")) {
            carrito[idx].cantidad += 1;
          } else if (e.target.classList.contains("cantidad-menos")) {
            carrito[idx].cantidad = Math.max(1, carrito[idx].cantidad - 1);
          }
          
          saveCart(carrito);
          renderCart();
      }
    });
  }
  
  // --- 4. Inicialización Final (Actualiza el contador al cargar) ---
  updateCartBadge(loadCart());
});
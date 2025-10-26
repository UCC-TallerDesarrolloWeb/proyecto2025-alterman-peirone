/* =========================================================
 * CrewLab - Checkout JS
 * =======================================================*/

"use strict";

/* ----- Constantes y utilidades ----- */
const STORAGE_KEY = "crewlab_carrito";
const $ = (id) => document.getElementById(id);

/* ----- Lectura del carrito ----- */
const getCart = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

/* ----- Método de envío seleccionado ----- */
const getShippingMethod = () => {
  const checked = document.querySelector('input[name="envio"]:checked');
  return checked ? checked.value : "domicilio";
};

/* ----- Cálculo del costo de envío ----- */
const calcShipping = (method) => {
  if (method === "local") return 0;
  if (method === "express") return 6000;
  return 2500;
};

/* ----- Elementos de UI para totales ----- */
const ensureTotalsUI = () => {
  const totalEl = $("checkout-total");
  let envioEl = document.getElementById("checkout-envio");
  let totalFinalEl = document.getElementById("checkout-total-final");

  if (!envioEl) {
    envioEl = document.createElement("p");
    envioEl.id = "checkout-envio";
    totalEl.insertAdjacentElement("afterend", envioEl);
  }
  if (!totalFinalEl) {
    totalFinalEl = document.createElement("p");
    totalFinalEl.id = "checkout-total-final";
    totalEl.parentElement.appendChild(totalFinalEl);
  }
  return { envioEl, totalFinalEl };
};

/* ----- Render del resumen del carrito ----- */
const renderCartSummary = () => {
  const lista = $("checkout-lista");
  const totalTexto = $("checkout-total");
  const carrito = getCart();

  lista.innerHTML = "";
  let subtotal = 0;

  carrito.forEach((item) => {
    const linea = document.createElement("li");
    const lineaSubtotal = item.precio * item.cantidad;
    subtotal += lineaSubtotal;
    linea.innerHTML = `
      <span>${item.nombre} (x${item.cantidad})</span>
      <strong>$${lineaSubtotal.toLocaleString("es-AR")}</strong>
    `;
    lista.appendChild(linea);
  });

  totalTexto.textContent = "Total: $" + subtotal.toLocaleString("es-AR");
  return subtotal;
};

/* ----- Actualización de totales ----- */
const updateTotalsUI = (subtotal, shipping) => {
  const { envioEl, totalFinalEl } = ensureTotalsUI();
  const totalFinal = subtotal + shipping;

  envioEl.textContent = "Envío: $" + shipping.toLocaleString("es-AR");
  totalFinalEl.textContent =
    "Total final: $" + totalFinal.toLocaleString("es-AR");
};

/* ----- Validaciones ----- */
const validateRequired = (el, mensaje) => {
  const val = (el.value || "").toString().trim();
  if (!val) {
    alert(mensaje);
    el.value = "";
    el.focus();
    return false;
  }
  return true;
};

const validateDNI = (el) => {
  const val = (el.value || "").trim();
  const ok = /^\d{7,10}$/.test(val);
  if (!ok) {
    alert("Ingresá un DNI válido (solo números, 7 a 10 dígitos).");
    el.value = "";
    el.focus();
  }
  return ok;
};

const validateNumero = (el) => {
  const val = Number((el.value || "").trim());
  const ok = !Number.isNaN(val) && val > 0;
  if (!ok) {
    alert("Ingresá un número válido para la dirección.");
    el.value = "";
    el.focus();
  }
  return ok;
};

/* ----- Validación general del formulario ----- */
const validateForm = () => {
  if (getCart().length === 0) {
    alert("Tu carrito está vacío. Agregá productos antes de confirmar.");
    return false;
  }

  const okNombre = validateRequired($("nombre"), "El nombre es obligatorio.");
  if (!okNombre) return false;

  const okApellido = validateRequired($("apellido"), "El apellido es obligatorio.");
  if (!okApellido) return false;

  const okDNIReq = validateRequired($("dni"), "El DNI es obligatorio.");
  if (!okDNIReq) return false;
  const okDNI = validateDNI($("dni"));
  if (!okDNI) return false;

  const okGenero = validateRequired($("genero"), "Seleccioná tu género.");
  if (!okGenero) return false;

  const okCalle = validateRequired($("calle"), "La calle es obligatoria.");
  if (!okCalle) return false;

  const okNumeroReq = validateRequired($("numero"), "El número de la dirección es obligatorio.");
  if (!okNumeroReq) return false;
  const okNumero = validateNumero($("numero"));
  if (!okNumero) return false;

  const okCP = validateRequired($("cp"), "El código postal es obligatorio.");
  if (!okCP) return false;

  const okCiudad = validateRequired($("ciudad"), "La ciudad es obligatoria.");
  if (!okCiudad) return false;

  const okProv = validateRequired($("provincia"), "Seleccioná una provincia.");
  if (!okProv) return false;

  if (getShippingMethod() === "express" && $("provincia").value !== "Córdoba") {
    alert('El "Envío Express" está disponible solo para la provincia de Córdoba.');
    return false;
  }

  return true;
};

/* ----- Recalcular totales ----- */
const recalcAndRenderTotals = () => {
  const subtotal = renderCartSummary();
  const shipping = calcShipping(getShippingMethod());
  updateTotalsUI(subtotal, shipping);
};

/* ----- Inicio ----- */
document.addEventListener("DOMContentLoaded", () => {
  recalcAndRenderTotals();

  document.querySelectorAll('input[name="envio"]').forEach((r) => {
    r.addEventListener("change", recalcAndRenderTotals);
  });

  const provinciaSel = $("provincia");
  if (provinciaSel) provinciaSel.addEventListener("change", recalcAndRenderTotals);

  const form = $("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert("¡Gracias por tu compra! Te enviaremos la confirmación por email.");
      }
    });
  }

  const dni = $("dni");
  if (dni) dni.addEventListener("blur", () => { if (dni.value) validateDNI(dni); });

  const numero = $("numero");
  if (numero) numero.addEventListener("blur", () => { if (numero.value) validateNumero(numero); });
});

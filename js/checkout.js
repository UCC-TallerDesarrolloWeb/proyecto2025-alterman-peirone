/* =========================================================
 * CrewLab - Checkout JS
 * Archivo externo con:
 *  - Resumen de carrito (subtotal)
 *  - Cálculo de envío y total final
 *  - Validación con alert() y blanqueo de campos inválidos
 *  - Todo con funciones flecha y const/let
 * =======================================================*/

"use strict";

/** Clave de LocalStorage para el carrito. */
const STORAGE_KEY = "crewlab_carrito";

/** Selección rápida por id. */
const $ = (id) => document.getElementById(id);

/**
 * Lee el carrito desde LocalStorage.
 * @returns {Array<{nombre:string, precio:number, cantidad:number}>}
 */
const getCart = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

/**
 * Devuelve el método de envío seleccionado.
 * @returns {"domicilio"|"express"|"local"}
 */
const getShippingMethod = () => {
  const checked = document.querySelector('input[name="envio"]:checked');
  return checked ? checked.value : "domicilio";
};

/**
 * Calcula el costo de envío según el método.
 * (Ejemplo simple para cumplir la rúbrica).
 * @param {"domicilio"|"express"|"local"} method
 * @returns {number} costo en ARS
 */
const calcShipping = (method) => {
  if (method === "local") return 0;
  if (method === "express") return 6000;
  return 2500; // domicilio
};

/**
 * Inserta (si no existen) y devuelve elementos de UI
 * para mostrar costo de envío y total final.
 * @returns {{envioEl:HTMLElement,totalFinalEl:HTMLElement}}
 */
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

/**
 * Renderiza el resumen del carrito (líneas + subtotal).
 * @returns {number} subtotal del carrito
 */
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

/**
 * Actualiza los totales de la vista (envío + total final).
 * @param {number} subtotal
 * @param {number} shipping
 */
const updateTotalsUI = (subtotal, shipping) => {
  const { envioEl, totalFinalEl } = ensureTotalsUI();
  const totalFinal = subtotal + shipping;

  envioEl.textContent = "Envío: $" + shipping.toLocaleString("es-AR");
  totalFinalEl.textContent =
    "Total final: $" + totalFinal.toLocaleString("es-AR");
};

/**
 * Valida un campo requerido. Si es inválido:
 * muestra alert() y BLANQUEA el campo.
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} el
 * @param {string} mensaje
 * @returns {boolean} true si es válido
 */
const validateRequired = (el, mensaje) => {
  const val = (el.value || "").toString().trim();
  if (!val) {
    alert(mensaje);
    el.value = ""; // blanqueo exigido por la rúbrica
    el.focus();
    return false;
  }
  return true;
};

/**
 * Valida un DNI: solo números (7 a 10 dígitos).
 * En caso de error, alerta y blanquea.
 * @param {HTMLInputElement} el
 * @returns {boolean}
 */
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

/**
 * Valida que el número de la calle sea > 0.
 * @param {HTMLInputElement} el
 * @returns {boolean}
 */
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

/**
 * Valida el formulario completo.
 * También verifica el carrito y la regla de envío Express.
 * @returns {boolean}
 */
const validateForm = () => {
  // carrito debe tener algo
  if (getCart().length === 0) {
    alert("Tu carrito está vacío. Agregá productos antes de confirmar.");
    return false;
  }

  // requeridos
  const okNombre = validateRequired($("nombre"), "El nombre es obligatorio.");
  if (!okNombre) return false;

  const okApellido = validateRequired(
    $("apellido"),
    "El apellido es obligatorio."
  );
  if (!okApellido) return false;

  const okDNIReq = validateRequired($("dni"), "El DNI es obligatorio.");
  if (!okDNIReq) return false;
  const okDNI = validateDNI($("dni"));
  if (!okDNI) return false;

  const okGenero = validateRequired($("genero"), "Seleccioná tu género.");
  if (!okGenero) return false;

  const okCalle = validateRequired($("calle"), "La calle es obligatoria.");
  if (!okCalle) return false;

  const okNumeroReq = validateRequired(
    $("numero"),
    "El número de la dirección es obligatorio."
  );
  if (!okNumeroReq) return false;
  const okNumero = validateNumero($("numero"));
  if (!okNumero) return false;

  const okCP = validateRequired($("cp"), "El código postal es obligatorio.");
  if (!okCP) return false;

  const okCiudad = validateRequired($("ciudad"), "La ciudad es obligatoria.");
  if (!okCiudad) return false;

  const okProv = validateRequired(
    $("provincia"),
    "Seleccioná una provincia."
  );
  if (!okProv) return false;

  // Regla ejemplo: Express sólo disponible para Córdoba
  if (getShippingMethod() === "express" && $("provincia").value !== "Córdoba") {
    alert('El "Envío Express" está disponible solo para la provincia de Córdoba.');
    return false;
  }

  return true;
};

/**
 * Recalcula y muestra subtotal, envío y total final.
 */
const recalcAndRenderTotals = () => {
  const subtotal = renderCartSummary();
  const shipping = calcShipping(getShippingMethod());
  updateTotalsUI(subtotal, shipping);
};

// =====================
// Boot
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Render inicial
  recalcAndRenderTotals();

  // Recalcular cuando cambia el método de envío o la provincia
  document.querySelectorAll('input[name="envio"]').forEach((r) => {
    r.addEventListener("change", recalcAndRenderTotals);
  });
  const provinciaSel = $("provincia");
  if (provinciaSel) provinciaSel.addEventListener("change", recalcAndRenderTotals);

  // Validación + confirmación
  const form = $("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm()) {
        alert("¡Gracias por tu compra! Te enviaremos la confirmación por email.");
        // Si querés, podés vaciar carrito y redirigir:
        // localStorage.removeItem(STORAGE_KEY);
        // window.location.href = "index.html";
      }
    });
  }

  // Validación puntual on-blur (para mostrar alert y blanquear al instante)
  const dni = $("dni");
  if (dni) dni.addEventListener("blur", () => { if (dni.value) validateDNI(dni); });

  const numero = $("numero");
  if (numero) numero.addEventListener("blur", () => { if (numero.value) validateNumero(numero); });
});

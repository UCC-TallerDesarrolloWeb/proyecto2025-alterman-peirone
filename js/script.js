document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  // Abrir/cerrar menú
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });

  // Cerrar menú si hago clic fuera
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("activo");
    }
  });
});

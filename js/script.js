document.addEventListener("DOMContentLoaded", () => {
  console.log("Página cargada 🚀");

  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    // Toggle: si está oculto lo muestra, si está visible lo oculta
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });
});

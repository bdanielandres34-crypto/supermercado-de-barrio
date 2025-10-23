// public/js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.insertBefore(container, document.body.firstChild);
    })
    .catch(err => console.error("Error al cargar navbar:", err));
});

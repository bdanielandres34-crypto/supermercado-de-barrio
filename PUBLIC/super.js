// Mostrar / ocultar el menú de categorías
const btnCategorias = document.getElementById('btnCategorias');
const menuCategorias = document.getElementById('menuCategorias');

btnCategorias.addEventListener('click', () => {
  menuCategorias.style.display =
    menuCategorias.style.display === 'block' ? 'none' : 'block';
});

// Redirigir a index.html (login)
document.getElementById('btnCuenta').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Redirigir al carrito.html
document.getElementById('btnCarrito').addEventListener('click', () => {
  window.location.href = 'carrito.html';
});

// Buscar (solo ejemplo)
document.getElementById('btnBuscar').addEventListener('click', () => {
  const query = document.getElementById('busquedaInput').value.trim();
  if (query) {
    alert(`Buscando "${query}"...`);
  } else {
    alert('Por favor escribe algo para buscar.');
  }
});

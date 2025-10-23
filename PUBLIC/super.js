// ==== MENÚ DE CATEGORÍAS ====
const btnCategorias = document.getElementById('btnCategorias');
const menuCategorias = document.getElementById('menuCategorias');

if (btnCategorias && menuCategorias) {
  btnCategorias.addEventListener('click', () => {
    menuCategorias.style.display =
      menuCategorias.style.display === 'block' ? 'none' : 'block';
  });
}

// ==== REDIRECCIONES ====
const btnCuenta = document.getElementById('btnCuenta');
const btnCarrito = document.getElementById('btnCarrito');
const btnBuscar = document.getElementById('btnBuscar');

if (btnCuenta) {
  btnCuenta.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

if (btnCarrito) {
  btnCarrito.addEventListener('click', () => {
    window.location.href = 'carrito.html';
  });
}

if (btnBuscar) {
  btnBuscar.addEventListener('click', () => {
    const query = document.getElementById('busquedaInput').value.trim();
    if (query) {
      alert(`Buscando "${query}"...`);
    } else {
      alert('Por favor escribe algo para buscar.');
    }
  });
}

// ==== SISTEMA DE CARRITO ====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Función para agregar productos
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(p => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarrito();
  alert(`${nombre} se agregó al carrito 🛒`);
}

// Mostrar cantidad en el ícono del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = totalItems;
  }
}

// Ejecutar contador al cargar
actualizarContadorCarrito();


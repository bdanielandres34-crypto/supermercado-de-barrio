// carrito.js

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} fue agregado al carrito 🛒`);
  actualizarContadorCarrito();
}

// Actualiza el número en el icono del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

// Eliminar producto desde el carrito
function eliminarDelCarrito(nombre) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(p => p.nombre !== nombre);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
}


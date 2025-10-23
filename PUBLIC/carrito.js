function seleccionarPago(metodo) {
  const opciones = document.querySelectorAll(".opcion-pago");
  opciones.forEach(op => op.classList.remove("seleccionado"));

  const seleccionada = Array.from(opciones).find(op => op.textContent.includes(metodo));
  if (seleccionada) seleccionada.classList.add("seleccionado");

  document.getElementById("pago-seleccionado").textContent = "Método de pago seleccionado: " + metodo;
  mostrarFormularioPago(metodo);
}

function mostrarFormularioPago(metodo) {
  const form = document.getElementById("form-pago");
  form.style.display = "block";

  if (metodo === "Efectivo") {
    form.innerHTML = `
      <p>💵 Paga directamente al recibir tu pedido.</p>
      <button class="btn" onclick="generarFactura('${metodo}')">Generar Factura</button>
    `;
  } 
  else if (metodo === "Tarjeta") {
    form.innerHTML = `
      <label>Número de tarjeta:</label><br>
      <input type="text" maxlength="16" placeholder="**** **** **** ****"><br>
      <label>Nombre en la tarjeta:</label><br>
      <input type="text" placeholder="Nombre completo"><br>
      <label>CVV:</label><br>
      <input type="text" maxlength="3" placeholder="***"><br><br>
      <button class="btn" onclick="generarFactura('${metodo}')">Pagar y generar factura</button>
    `;
  } 
  else if (metodo === "Nequi") {
    form.innerHTML = `
      <p>📱 Envía el valor total al número <strong>3001234567</strong> vía Nequi.</p>
      <label>Número desde el que envías:</label><br>
      <input type="text" placeholder="Ej: 3009876543"><br><br>
      <button class="btn" onclick="generarFactura('${metodo}')">Confirmar y generar factura</button>
    `;
  } 
  else if (metodo === "Daviplata") {
    form.innerHTML = `
      <p>💰 Envía el valor total al número <strong>3101234567</strong> vía Daviplata.</p>
      <label>Número desde el que envías:</label><br>
      <input type="text" placeholder="Ej: 3109876543"><br><br>
      <button class="btn" onclick="generarFactura('${metodo}')">Confirmar y generar factura</button>
    `;
  }
}

function generarFactura(metodo) {
  alert("✅ Pago realizado con éxito mediante " + metodo + ". Tu factura ha sido generada.");
  window.location.href = "index.html"; // Vuelve al inicio después del pago
}





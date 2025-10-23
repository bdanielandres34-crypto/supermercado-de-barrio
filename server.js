const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const session = require("express-session"); // 👈 Importar módulo de sesión

const app = express();
const PORT = 3000;

// 🟢 Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "supermercado"
});

db.connect(err => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// 🟢 Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// 🟢 Configurar sesiones
app.use(session({
  secret: "clave_secreta_segura",
  resave: false,
  saveUninitialized: true
}));

// 🟢 Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🟢 Registrar usuarios
app.post("/register", (req, res) => {
  const { usuario, correo, contrasena } = req.body;
  const sql = "INSERT INTO usuarios (usuario, correo, contrasena) VALUES (?, ?, ?)";
  db.query(sql, [usuario, correo, contrasena], (err) => {
    if (err) {
      console.error("❌ Error al registrar usuario:", err);
      return res.send("<script>alert('El correo ya está registrado.'); window.location.href='/register.html';</script>");
    }
    console.log("✅ Usuario registrado correctamente");
    res.redirect("/index.html");
  });
});

// 🟢 Iniciar sesión
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;
  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
  db.query(sql, [correo, contrasena], (err, results) => {
    if (err) {
      console.error("❌ Error al iniciar sesión:", err);
      return res.send("Error interno del servidor");
    }

    if (results.length > 0) {
      req.session.usuario = results[0].usuario; // ✅ Guardar nombre en la sesión
      console.log("✅ Sesión iniciada como:", req.session.usuario);
      res.redirect("/super.html");
    } else {
      res.send("<script>alert('Correo o contraseña incorrectos'); window.location.href='/index.html';</script>");
    }
  });
});

// 🟢 Obtener usuario actual
app.get("/usuario-actual", (req, res) => {
  if (req.session.usuario) {
    res.json({ usuario: req.session.usuario });
  } else {
    res.json({ usuario: null });
  }
});

// 🟢 Cerrar sesión
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/index.html");
  });
});

// 🟢 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});

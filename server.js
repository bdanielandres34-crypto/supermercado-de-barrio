const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (results.length > 0) return res.json({ success: true });
    res.json({ success: false });
  });
});

// Ruta para registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const checkUser = 'SELECT * FROM users WHERE username = ?';
  const insertUser = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(checkUser, [username], (err, results) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (results.length > 0) return res.json({ success: false, message: 'Usuario ya existe' });

    db.query(insertUser, [username, password], (err2) => {
      if (err2) return res.status(500).send('Error al registrar');
      res.json({ success: true });
    });
  });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));

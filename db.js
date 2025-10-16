const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // tu usuario MySQL
  password: '',       // tu contraseña MySQL
  database: 'login_db'
});

connection.connect(err => {
  if (err) console.error('Error al conectar con MySQL:', err);
  else console.log('Conectado a MySQL');
});

module.exports = connection;

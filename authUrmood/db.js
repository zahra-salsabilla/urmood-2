const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'nama_database'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;

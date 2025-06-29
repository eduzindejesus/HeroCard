const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../../heroes.db'));

db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Tabela de heróis
  db.run(`
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      imageUrl TEXT
    )
  `);

  // Inserir usuário admin (se não existir)
  db.get('SELECT * FROM users WHERE username = ?', ['admin'], (err, row) => {
    if (!row) {
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', '1234']);
    }
  });
});

module.exports = db;

const db = require('./src/config/db');

db.serialize(() => {
  db.run('DELETE FROM heroes', (err) => {
    if (err) return console.error('Erro ao limpar heróis:', err);
    console.log('Tabela heroes limpa.');
  });

  db.run('DELETE FROM users', (err) => {
    if (err) return console.error('Erro ao limpar usuários:', err);
    console.log('Tabela users limpa.');
  });
});

const db = require('../config/db');

const HeroModel = {
  getAll: (callback) => {
    db.all('SELECT * FROM heroes', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM heroes WHERE id = ?', [id], callback);
  },

  create: ({ name, description, imageUrl }, callback) => {
    db.run(
      'INSERT INTO heroes (name, description, imageUrl) VALUES (?, ?, ?)',
      [name, description, imageUrl],
      function (err) {
        if (err) return callback(err);
        callback(null, { id: this.lastID, name, description, imageUrl });
      }
    );
  },

  update: (id, { name, description, imageUrl }, callback) => {
    const sql = `
      UPDATE heroes
      SET name = ?, description = ?, imageUrl = ?
      WHERE id = ?
    `;
    db.run(sql, [name, description, imageUrl, id], function (err) {
      callback(err);
    });
  },

  delete: (id, callback) => {
    db.run('DELETE FROM heroes WHERE id = ?', [id], function (err) {
      callback(err);
    });
  },
};

module.exports = HeroModel;

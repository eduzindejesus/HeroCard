const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, user) => {
      if (err) {
        console.error('Erro no login:', err);
        return res.status(500).json({ error: 'Erro no servidor' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Retorna sucesso (você pode adicionar JWT aqui depois)
      res.json({ success: true, user: { id: user.id, username: user.username } });
    }
  );
});

module.exports = router;

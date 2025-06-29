// backend/index.js
const express = require('express');
const cors = require('cors');
const heroesRoutes = require('./src/routes/heroes');
const authRoutes = require('./src/routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/heroes', heroesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

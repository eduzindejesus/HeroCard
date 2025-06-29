const express = require('express');
const router = express.Router();
const Hero = require('../models/heroModel');

// GET: Todos os heróis
router.get('/', (req, res) => {
  Hero.getAll((err, heroes) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar heróis' });
    res.json(heroes);
  });
});

// GET: Um herói por ID
router.get('/:id', (req, res) => {
  Hero.getById(req.params.id, (err, hero) => {
    if (err || !hero) return res.status(404).json({ error: 'Herói não encontrado' });
    res.json(hero);
  });
});

// POST: Criar novo herói
router.post('/', (req, res) => {
  const { name, description, imageUrl } = req.body;

  if (!name || !description || !imageUrl) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  Hero.create({ name, description, imageUrl }, (err, newHero) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar herói' });
    res.status(201).json(newHero);
  });
});

module.exports = router;

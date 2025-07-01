const express = require('express');
const router = express.Router();
const Hero = require('../models/heroModel');
const { body, param, query, validationResult } = require('express-validator');

// GET: Todos os heróis (com filtro por nome)
router.get(
  '/',
  [
    query('name')
      .optional()
      .isString()
      .withMessage('O parâmetro de nome deve ser um texto'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Hero.getAll((err, heroes) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar heróis' });

      const { name } = req.query;
      const filtered = name
        ? heroes.filter((h) =>
            h.name?.toLowerCase().includes(name.toLowerCase())
          )
        : heroes;

      res.json(filtered);
    });
  }
);

// GET: Um herói por ID
router.get('/:id', [param('id').isInt()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  Hero.getById(req.params.id, (err, hero) => {
    if (err || !hero) return res.status(404).json({ error: 'Herói não encontrado' });
    res.json(hero);
  });
});

// POST: Criar novo herói
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('description').trim().notEmpty().withMessage('Descrição é obrigatória'),
    body('imageUrl')
      .trim()
      .notEmpty().withMessage('URL da imagem é obrigatória')
      .isURL().withMessage('URL da imagem inválida'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description, imageUrl } = req.body;

    Hero.create({ name, description, imageUrl }, (err, newHero) => {
      if (err) return res.status(500).json({ error: 'Erro ao criar herói' });
      res.status(201).json(newHero);
    });
  }
);

// PUT: Atualizar herói
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID inválido'),
    body('name').optional().notEmpty().withMessage('Nome não pode ser vazio'),
    body('description').optional().notEmpty().withMessage('Descrição não pode ser vazia'),
    body('imageUrl').optional().isURL().withMessage('URL da imagem inválida'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = req.params.id;
    const { name, description, imageUrl } = req.body;

    Hero.getById(id, (err, hero) => {
      if (err || !hero) return res.status(404).json({ error: 'Herói não encontrado' });

      const updatedHero = {
        name: name ?? hero.name,
        description: description ?? hero.description,
        imageUrl: imageUrl ?? hero.imageUrl,
      };

      Hero.update(id, updatedHero, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar herói' });
        res.json({ id, ...updatedHero });
      });
    });
  }
);

// DELETE: Remover herói
router.delete(
  '/:id',
  [param('id').isInt().withMessage('ID inválido')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    Hero.delete(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao deletar herói' });
      res.json({ message: 'Herói deletado com sucesso' });
    });
  }
);

module.exports = router;

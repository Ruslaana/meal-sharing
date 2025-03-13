/* eslint-disable no-unused-vars */
import express from 'express';
import knex from '../database_client.js';

const mealsRouter = express.Router();

// GET all meals
mealsRouter.get('/', async (req, res) => {
  try {
    const meals = await knex('Meal').select('*');
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving meals' });
  }
});

// POST a new meal
mealsRouter.post('/', async (req, res) => {
  try {
    const [id] = await knex('Meal').insert(req.body);
    res.status(201).json({ id, message: 'Meal added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding meal' });
  }
});

// GET meal by ID
mealsRouter.get('/:id', async (req, res) => {
  try {
    const meal = await knex('Meal').where({ id: req.params.id }).first();
    if (!meal) return res.status(404).json({ error: 'Meal not found' });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving meal' });
  }
});

// PUT update meal by ID
mealsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await knex('Meal')
      .where({ id: req.params.id })
      .update(req.body);
    if (!updated) return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating meal' });
  }
});

// DELETE meal by ID
mealsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await knex('Meal').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting meal' });
  }
});

export default mealsRouter;

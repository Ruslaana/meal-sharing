import express from 'express';
import knex from '../database_client.js';

const mealsRouter = express.Router();

// GET all meals
mealsRouter.get('/', async (req, res) => {
  try {
    const meals = await knex('meals').orderBy('id');
    if (meals.length) {
      res.json(meals);
    } else {
      res.status(200).json({ message: 'No meals found' });
    }
  } catch (error) {
    console.error('Error retrieving meals:', error);
    res.status(500).json({ error: 'Error retrieving meals' });
  }
});

// POST a new meal
mealsRouter.post('/', async (req, res) => {
  try {
    const [id] = await knex('meals').insert(req.body);
    res.status(201).json({ id, message: 'Meal added successfully' });
  } catch (error) {
    console.error('Error retrieving meals:', error);
    res.status(500).json({ error: 'Error adding meal' });
  }
});

// GET meal by ID (with available_reservations)
mealsRouter.get('/:id', async (req, res) => {
  try {
    const meal = await knex('meals').where({ id: req.params.id }).first();

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    const reservationCount = await knex('reservations')
      .where({ meal_id: req.params.id })
      .count('* as count')
      .first();

    const available =
      meal.max_reservations - Number(reservationCount.count || 0);

    res.json({ ...meal, available_reservations: available });
  } catch (error) {
    console.error('Error retrieving meals:', error);
    res.status(500).json({ error: 'Error retrieving meal' });
  }
});

// PUT update meal by ID
mealsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await knex('meals')
      .where({ id: req.params.id })
      .update(req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json({ message: 'Meal updated successfully' });
  } catch (error) {
    console.error('Error retrieving meals:', error);
    res.status(500).json({ error: 'Error updating meal' });
  }
});

// DELETE meal by ID
mealsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await knex('meals').where({ id: req.params.id }).del();
    if (!deleted) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error retrieving meals:', error);
    res.status(500).json({ error: 'Error deleting meal' });
  }
});

export default mealsRouter;

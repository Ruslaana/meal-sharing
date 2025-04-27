/* eslint-disable no-unused-vars */
import express from 'express';
import knex from '../database_client.js';

const mealsRouter = express.Router();

// GET all meals with filtering, sorting, and limiting

// mealsRouter.get('/', async (req, res) => {
//   try {
//     let query = knex('Meals').select('Meals');
//     return res.json(query);

// let query = knex('Meals')
//   .select('Meals.*')
//   .leftJoin('Reservations', 'Meals.id', 'Reservations.meal_id')
//   .groupBy('Meals.id')
//   .count('Reservations.id as total_reservations');
// if (req.query.maxPrice) {
//   query = query.where('price', '<=', parseFloat(req.query.maxPrice));
// }
// if (req.query.availableReservations) {
//   const available = req.query.availableReservations === 'true';
//   query = query
//     .leftJoin('Reservation', 'Meal.id', 'Reservation.meal_id')
//     .groupBy('Meal.id')
//     .havingRaw(
//       available
//         ? 'Meal.max_reservations > COALESCE(SUM(Reservation.number_of_guests), 0)'
//         : 'Meal.max_reservations <= COALESCE(SUM(Reservation.number_of_guests), 0)',
//     );
// }
// if (req.query.title) {
//   query = query.where('title', 'like', `%${req.query.title}%`);
// }
// if (req.query.dateAfter) {
//   query = query.where('when', '>', req.query.dateAfter);
// }
// if (req.query.dateBefore) {
//   query = query.where('when', '<', req.query.dateBefore);
// }
// if (req.query.sortKey) {
//   const validKeys = ['when', 'max_reservations', 'price'];
//   if (validKeys.includes(req.query.sortKey)) {
//     const direction = req.query.sortDir === 'desc' ? 'desc' : 'asc';
//     query = query.orderBy(req.query.sortKey, direction);
//   }
// }
// if (req.query.limit) {
//   query = query.limit(parseInt(req.query.limit));
// }
// const meals = await query;
// res.json(meals);
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving meals' });
//   }
// });

mealsRouter.get('/', async (_, res) => {
  try {
    const meals = await knex('meals').orderBy('id');
    console.log(meals);

    meals.length
      ? res.json(meals)
      : res.status(200).json({ message: 'No meals found' });
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Error retrieving meals' });
  }
});

// POST a new meal
mealsRouter.post('/', async (req, res) => {
  try {
    const [id] = await knex('meals').insert(req.body);
    res.status(201).json({ id, message: 'Meal added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding meal' });
  }
});

// GET meal by ID
mealsRouter.get('/:id', async (req, res) => {
  try {
    const meal = await knex('meals').where({ id: req.params.id }).first();
    if (!meal) return res.status(404).json({ error: 'Meal not found' });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving meal' });
  }
});

// PUT update meal by ID
mealsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await knex('meals')
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
    const deleted = await knex('meals').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting meal' });
  }
});

export default mealsRouter;

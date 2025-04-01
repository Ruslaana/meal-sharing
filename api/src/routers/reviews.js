/* eslint-disable no-unused-vars */
import express from 'express';
import knex from '../database_client.js';

const reviewsRouter = express.Router();

// GET all review
reviewsRouter.get('/', async (req, res) => {
  try {
    const reviews = await knex('Review').select('*');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reviews' });
  }
});

// GET review for specific meal
reviewsRouter.get('/meal/:meal_id', async (req, res) => {
  try {
    const reviews = await knex('Review').where({ meal_id: req.params.meal_id });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reviews' });
  }
});

// POST new review
reviewsRouter.post('/', async (req, res) => {
  try {
    const [id] = await knex('Review').insert(req.body);
    res.status(201).json({ id, message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
});

// GET review by id
reviewsRouter.get('/:id', async (req, res) => {
  try {
    const review = await knex('Review').where({ id: req.params.id }).first();
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving review' });
  }
});

// PUT update review
reviewsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await knex('Review')
      .where({ id: req.params.id })
      .update(req.body);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating review' });
  }
});

// delete review
reviewsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await knex('Review').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review' });
  }
});

export default reviewsRouter;

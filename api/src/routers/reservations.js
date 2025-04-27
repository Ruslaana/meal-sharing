/* eslint-disable no-unused-vars */
import express from 'express';
import knex from '../database_client.js';

const reservationsRouter = express.Router();

// GET all reservations
reservationsRouter.get('/', async (req, res) => {
  try {
    const reservations = await knex('reservations').select('*');
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Error retrieving reservations' });
  }
});

// POST a new reservation
reservationsRouter.post('/', async (req, res) => {
  try {
    const [id] = await knex('reservations').insert(req.body);
    res.status(201).json({ id, message: 'Reservation added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding reservation' });
  }
});

// GET reservation by ID
reservationsRouter.get('/:id', async (req, res) => {
  try {
    const reservation = await knex('reservations')
      .where({ id: req.params.id })
      .first();
    if (!reservation)
      return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reservation' });
  }
});

// PUT update reservation by ID
reservationsRouter.put('/:id', async (req, res) => {
  try {
    const updated = await knex('reservations')
      .where({ id: req.params.id })
      .update(req.body);
    if (!updated)
      return res.status(404).json({ error: 'Reservation not found' });
    res.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating reservation' });
  }
});

// DELETE reservation by ID
reservationsRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await knex('reservations')
      .where({ id: req.params.id })
      .del();
    if (!deleted)
      return res.status(404).json({ error: 'Reservation not found' });
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting reservation' });
  }
});

export default reservationsRouter;

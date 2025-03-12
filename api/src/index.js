import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mealsRouter from './routers/meals.js';
import reservationsRouter from './routers/reservation.js';
import database from './database_client.js'; 

database
  .raw('SELECT 1')
  .then(() => {
    console.log('Connection to the database was successful!');

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api/meals', mealsRouter);
    app.use('/api/reservations', reservationsRouter);

    app.listen(process.env.PORT || 3001, () => {
      console.log(`API listening on port ${process.env.PORT || 3001}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
    process.exit(1); 
  });

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mealsRouter from './routers/meals.js';
import reservationsRouter from './routers/reservations.js';
import reviewsRouter from './routers/reviews.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/meals', mealsRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`API listening on port ${process.env.PORT || 3001}`);
});

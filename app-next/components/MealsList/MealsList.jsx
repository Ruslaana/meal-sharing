'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/meals');
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error('Error when receiving meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <Grid container spacing={3}>
      {meals.map(meal => (
        <Grid item xs={12} sm={6} md={4} key={meal.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="200"
              image={meal.image || '/images/default.jpg'}
              alt={meal.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: 'Pacifico, cursive', color: '#ff8a80' }}
              >
                {meal.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Dancing Script, cursive' }}
              >
                {meal.description}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: 'Dancing Script, cursive' }}
              >
                Price: ${meal.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MealsList;

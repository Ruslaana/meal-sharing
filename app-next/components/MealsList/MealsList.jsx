'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/navigation'; // ✅

const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/meals');
        const data = await response.json();
        setMeals(limit ? data.slice(0, limit) : data);
      } catch (error) {
        console.error('Error when receiving meals:', error);
      }
    };

    fetchMeals();
  }, [limit]);

  return (
    <Grid container spacing={3}>
      {meals.map(meal => (
        <Grid item xs={12} sm={6} md={3} key={meal.id}>
          <Card
            sx={{ maxWidth: 345, cursor: 'pointer' }}
            onClick={() => router.push(`/meals/${meal.id}`)}
          >
            <CardMedia
              component="img"
              height="200"
              image={
                meal.img_url ||
                'https://placeholder.apptor.studio/200/200/product1.png'
              }
              alt={meal.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontFamily: 'Inter, sans-serif', color: '#ff8a80' }}
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

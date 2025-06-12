'use client';

import React from 'react';
import MealsList from '../../components/MealsList/MealsList';
import Layout from '../../components/Layout/Layout';
import { Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const MealsPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Button
        onClick={() => router.back()}
        variant="outlined"
        sx={{
          mb: 3,
          fontFamily: 'Pacifico, cursive',
          color: '#ff8a80',
          borderColor: '#ff8a80',
          '&:hover': { backgroundColor: '#ffebee', borderColor: '#ff5252' },
        }}
      >
        ← Back
      </Button>

      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Pacifico, cursive',
          mb: 4,
          textAlign: 'center',
          color: '#f48fb1',
        }}
      >
        All Available Meals
      </Typography>

      <MealsList />
    </Layout>
  );
};

export default MealsPage;

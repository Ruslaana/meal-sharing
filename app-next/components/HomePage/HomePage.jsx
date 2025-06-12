import React from 'react';
import { AppBar, Box, Typography, Toolbar } from '@mui/material';
import MealsList from '../MealsList/MealsList';

import { CssBaseline } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      {/* Хедер */}
      <AppBar
        position="static"
        sx={{ backgroundColor: '#f1f1f1', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#ff8a80', fontFamily: 'Pacifico, cursive' }}
          >
            Meals
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#fff9e6',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#f48fb1',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontFamily: 'Pacifico, cursive',
          }}
        >
          Welcome to Meal Sharing App!
        </Typography>
        <MealsList />
      </Box>
    </Box>
  );
};

export default HomePage;

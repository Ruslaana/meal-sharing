'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Typography,
  Toolbar,
  CssBaseline,
  Button,
} from '@mui/material';
import MealsList from '../MealsList/MealsList';
import Footer from '../Footer/Footer';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <CssBaseline />

      <Box>
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
              sx={{
                color: '#ff8a80',
                fontFamily: 'Pacifico, cursive',
                fontSize: '1.8rem',
              }}
            >
              Meal Sharing App
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#fff9e6',
            minHeight: '80vh',
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

          <MealsList limit={8} />

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => router.push('/meals')}
              sx={{
                fontFamily: 'Pacifico, cursive',
                color: '#ff8a80',
                borderColor: '#ff8a80',
                '&:hover': {
                  backgroundColor: '#ffebee',
                  borderColor: '#ff5252',
                },
              }}
            >
              See All Meals
            </Button>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default HomePage;

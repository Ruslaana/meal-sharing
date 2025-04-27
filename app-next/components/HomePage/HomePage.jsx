import React from 'react';
import MealsList from '../MealsList/MealsList';

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Meal Sharing App!</h1>
      <MealsList />
    </div>
  );
};

export default HomePage;

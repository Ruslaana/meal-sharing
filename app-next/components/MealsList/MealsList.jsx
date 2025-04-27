'use client';

import React, { useEffect, useState } from 'react';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/meals');
        const data = await response.json();
        console.log('Meals received:', data);

        setMeals(data);
      } catch (error) {
        console.error('Error when receiving meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h2>Meals' list</h2>
      {meals.map(meal => (
        <div
          key={meal.id}
          style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}
        >
          <p>
            <strong>{meal.title}</strong>
          </p>
          <p>{meal.description}</p>
          <p>Price: {meal.price}$</p>
        </div>
      ))}
    </div>
  );
};

export default MealsList;

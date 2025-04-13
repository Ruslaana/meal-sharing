import React, { useEffect, useState } from 'react';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('/api/meals');
        const data = await response.json();
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
          <p>Price: {meal.price} грн</p>
        </div>
      ))}
    </div>
  );
};

export default MealsList;

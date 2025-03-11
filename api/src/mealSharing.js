/* eslint-disable no-unused-vars */
import express from "express";
import knex from "./database_client.js";

const mealSharingRouter = express.Router();

// getting a list of meals
const getMeals = async (query, res, errorMessage) => {
  try {
    const meals = await knex.raw(query);
    res.json(meals[0]);
  } catch (error) {
    res.status(500).json({ error: errorMessage });
  }
};

// getting future meals
mealSharingRouter.get("/future-meals", (req, res) => {
  getMeals("SELECT * FROM Meal WHERE `when` > NOW()", res, "Error retrieving future meals");
});

// getting past meals
mealSharingRouter.get("/past-meals", (req, res) => {
  getMeals("SELECT * FROM Meal WHERE `when` < NOW()", res, "Error retrieving past meals");
});

// getting all meals with id
mealSharingRouter.get("/all-meals", (req, res) => {
  getMeals("SELECT * FROM Meal ORDER BY id", res, "Error retrieving all meals");
});

// getting the first meal with min id
mealSharingRouter.get("/first-meal", async (req, res) => {
  try {
    const [meal] = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (!meal.length) {
      return res.status(404).json({ error: "There aren't available meals" });
    }
    res.json(meal[0]);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the first meal" });
  }
});

// getting the last meal with max ID
mealSharingRouter.get("/last-meal", async (req, res) => {
  try {
    const [meal] = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (!meal.length) {
      return res.status(404).json({ error: "There aren't available meals" });
    }
    res.json(meal[0]);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the last meal" });
  }
});

export default mealSharingRouter;

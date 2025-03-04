import express from "express";
import knex from "../database_client.js";

const mealSharingRouter = express.Router();

// getting future meals
mealSharingRouter.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` > NOW()");
    res.json(meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання майбутніх страв" });
  }
});

// getting past meals
mealSharingRouter.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal WHERE `when` < NOW()");
    res.json(meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання минулих страв" });
  }
});

// getting all meals sorted by id
mealSharingRouter.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM Meal ORDER BY id");
    res.json(meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання всіх страв" });
  }
});

// getting the first meal with min id
mealSharingRouter.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM Meal ORDER BY id ASC LIMIT 1");
    if (meal[0].length === 0) {
      return res.status(404).json({ error: "Немає доступних страв" });
    }
    res.json(meal[0][0]);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання першої страви" });
  }
});

// getting the last meal with max id
mealSharingRouter.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM Meal ORDER BY id DESC LIMIT 1");
    if (meal[0].length === 0) {
      return res.status(404).json({ error: "Немає доступних страв" });
    }
    res.json(meal[0][0]);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання останньої страви" });
  }
});

export default mealSharingRouter;

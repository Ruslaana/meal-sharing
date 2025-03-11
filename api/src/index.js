import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./mealSharing.js"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`API listening on port ${process.env.PORT || 3001}`);
});

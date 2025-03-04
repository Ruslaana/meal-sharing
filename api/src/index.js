import express from "express";
import mealSharingRouter from "./routers/mealSharing.js"; 
import nestedRouter from "./routers/nested.js";

const apiRouter = express.Router();

// Використовуємо маршрути
apiRouter.use("/meals", mealSharingRouter); 
apiRouter.use("/nested", nestedRouter); 

apiRouter.get("/", (req, res) => {
  res.send("API головна сторінка");
});

export default apiRouter;
import express from "express";
import apiRouter from "./src/index.js"; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});

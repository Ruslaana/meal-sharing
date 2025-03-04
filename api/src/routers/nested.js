import express from "express";

const express = require("express");
const apiRouter = require("./routes/api"); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); 
app.use("/api", apiRouter); 

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});

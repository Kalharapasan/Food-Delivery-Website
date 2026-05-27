import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

// Load env first, before anything else
dotenv.config();

const app = express();
const port = process.env.PORT;


// DB connection
connectDB();

app.get("/", (req, res) => {
  res.send("API Working ✅");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

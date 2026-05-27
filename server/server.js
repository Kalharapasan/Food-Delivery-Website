import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

// Load env first, before anything else
dotenv.config();

const app = express();
const port = process.env.PORT;

// Webhook MUST be before express.json() middleware
app.post(
    "/api/order/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

// DB connection
connectDB();

app.get("/", (req, res) => {
    res.send("API Working ✅");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

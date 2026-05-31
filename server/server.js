import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { connectDB } from "./config/Databases.js";
import cartRouter from "./routes/cartRoute.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";
import { stripeWebhook } from "./controllers/orderController.js";

// Load env first, before anything else
dotenv.config();

const app = express();
const port = process.env.PORT;

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Webhook MUST be before express.json() middleware
app.post(
    "/api/order/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL,
            process.env.ADMIN_URL,
        ],
        credentials: true,
    })
);

// DB connection
connectDB();

// API endpoints
app.use("/api/user", userRouter);
app.use("/image", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
    res.send("API Working ✅");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

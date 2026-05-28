import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

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

app.get("/", (req, res) => {
    res.send("API Working ✅");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

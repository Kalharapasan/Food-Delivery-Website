import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder, getSummary } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get('/list',adminAuth,listOrders);
orderRouter.post("/status",adminAuth,updateStatus);
orderRouter.get("/summary", adminAuth, getSummary);

export default orderRouter;


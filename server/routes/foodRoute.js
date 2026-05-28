import express from "express";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import adminAuth from "../middleware/adminAuth.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    
});

export default foodRouter;
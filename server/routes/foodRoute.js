import express from "express";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import adminAuth from "../middleware/adminAuth.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`);
    },
});

export default foodRouter;
import { supabase } from "../config/Databases.js";
import fs from "fs";

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }
}

const listFood = async (req, res) => {}

const removeFood = async (req, res) => {}


const updateFood = async (req, res) => {}


export { addFood, listFood, removeFood, updateFood };
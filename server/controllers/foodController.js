import { supabase } from "../config/Databases.js";
import fs from "fs";

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }
    const image_filename = req.file.filename;
    try {
        const { error } = await supabase.from("foods").insert([
            {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                category: req.body.category,
                image: image_filename,
            },
        ]);
        if (error) throw error;
        res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {

    }
}

const listFood = async (req, res) => { }

const removeFood = async (req, res) => { }


const updateFood = async (req, res) => { }


export { addFood, listFood, removeFood, updateFood };
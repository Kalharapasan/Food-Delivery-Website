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
        console.error("Add food error:", error);
        res.json({ success: false, message: "Error adding food item" });
    }
}

const listFood = async (req, res) => {
    try {
        const { data: foods, error } = await supabase.from("foods").select("*");
        if (error) throw error;
        const mappedFoods = foods.map((food) => ({ ...food, _id: food.id }));
        res.json({ success: true, foods: mappedFoods });
    } catch (error) {
        console.error("List food error:", error);
        res.json({ success: false, message: "Error fetching foods" });
    }
}

const removeFood = async (req, res) => { }


const updateFood = async (req, res) => { }


export { addFood, listFood, removeFood, updateFood };
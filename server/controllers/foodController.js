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

const removeFood = async (req, res) => {
    try {
        const id = req.body.id || req.body._id;
        const { data: food, error: fetchError } = await supabase
            .from("foods")
            .select("*")
            .eq("id", id)
            .single();
        if (fetchError) throw fetchError;
        fs.unlink(`uploads/${food.image}`, () => { });
        const { error: deleteError } = await supabase.from("foods").delete().eq("id", id);

        if (deleteError) throw deleteError;
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.error("Remove food error:", error);
        res.json({ success: false, message: "Error removing food item" });
    }
}


const updateFood = async (req, res) => { }


export { addFood, listFood, removeFood, updateFood };
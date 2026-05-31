import { supabase } from "../config/Databases.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Check if item already exists in cart
        const { data: item, error: fetchError } = await supabase
            .from('cart_items')
            .select('quantity')
            .eq('userId', userId)
            .eq('foodId', itemId)
            .maybeSingle();

        if (item) {
            // Update quantity
            await supabase
                .from('cart_items')
                .update({ quantity: item.quantity + 1 })
                .eq('userId', userId)
                .eq('foodId', itemId);
        } else {
            // Insert new item
            await supabase
                .from('cart_items')
                .insert([{ "userId": userId, "foodId": itemId, quantity: 1 }]);
        }

        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Fetch current item quantity
        const { data: item } = await supabase
            .from('cart_items')
            .select('quantity')
            .eq('userId', userId)
            .eq('foodId', itemId)
            .maybeSingle();

        if (item && item.quantity > 1) {
            // Decrease quantity
            await supabase
                .from('cart_items')
                .update({ quantity: item.quantity - 1 })
                .eq('userId', userId)
                .eq('foodId', itemId);
        } else if (item && item.quantity === 1) {
            // Remove item from cart
            await supabase
                .from('cart_items')
                .delete()
                .eq('userId', userId)
                .eq('foodId', itemId);
        }

        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const getCart = async (req, res) => {

};

export { addToCart, removeFromCart, getCart }
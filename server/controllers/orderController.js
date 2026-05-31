import { supabase } from "../config/Databases.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL;
    try {
        const { data: newOrder, error } = await supabase
            .from("orders")
            .insert([
                {
                    userId: req.body.userId,
                    items: req.body.items,
                    amount: req.body.amount,
                    address: req.body.address,
                    date: new Date().toISOString(),
                    payment: false,
                    status: "Food Processing",
                },
            ])
            .select()
            .single();
        
        if (error) throw error;
        await supabase.from("cart_items").delete().eq("userId", req.body.userId);
        
    } catch (error) {

    }
};

const verifyOrder = async (req, res) => { };

const userOrders = async (req, res) => { };

const listOrders = async (req, res) => { };

const updateStatus = async (req, res) => { };

const getSummary = async (req, res) => { };

const stripeWebhook = async (request, response) => { };


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getSummary, stripeWebhook };
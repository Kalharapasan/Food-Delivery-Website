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
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Charges" },
                unit_amount: 200,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder.id}`,
            metadata: { orderId: newOrder.id },
        });

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
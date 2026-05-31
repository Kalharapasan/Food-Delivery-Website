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

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Place order error:", error);
        res.json({ success: false, message: "Failed to place order. Please try again." });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await supabase.from("orders").update({ payment: true }).eq("id", orderId);
            res.json({ success: true, message: "Payment confirmed" });
        } else {
            await supabase.from("orders").delete().eq("id", orderId);
            res.json({ success: false, message: "Payment cancelled" });
        }
    } catch (error) {
        console.error("Verify order error:", error);
        res.json({ success: false, message: "Error verifying payment" });
    }
};

const userOrders = async (req, res) => {
    try {
        const { data: orders, error } = await supabase
            .from("orders")
            .select("*")
            .eq("userId", req.body.userId)
            .order("date", { ascending: false });

        if (error) throw error;

        const mappedOrders = orders.map((order) => ({ ...order, _id: order.id }));
        res.json({ success: true, data: mappedOrders });
    } catch (error) {
        console.error("User orders error:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

const listOrders = async (req, res) => {
    try {
        const { data: orders, error } = await supabase
            .from("orders")
            .select("*")
            .order("date", { ascending: false });

        if (error) throw error;

        const mappedOrders = orders.map((order) => ({ ...order, _id: order.id }));
        res.json({ success: true, data: mappedOrders });
    } catch (error) {
        console.error("List orders error:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

const updateStatus = async (req, res) => { };

const getSummary = async (req, res) => { };

const stripeWebhook = async (request, response) => { };


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getSummary, stripeWebhook };
import { supabase } from "../config/Databases.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

};

const verifyOrder = async (req, res) => {};

const userOrders = async (req, res) => {};

const listOrders = async (req, res) => {};

const updateStatus = async (req, res) => {};

const getSummary = async (req, res) => {};

const stripeWebhook = async (request, response) => {};


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getSummary, stripeWebhook };
import jwt from "jsonwebtoken";
import { supabase } from "../config/Databases.js";

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Admin login required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        
    }

};

export default adminAuth;
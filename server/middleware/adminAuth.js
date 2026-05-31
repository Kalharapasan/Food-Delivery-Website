import jwt from "jsonwebtoken";
import { supabase } from "../config/Databases.js";

const adminAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Admin login required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data: user, error } = await supabase
            .from("users")
            .select("role")
            .eq("id", decoded.id)
            .single();
        if (error || !user || user.role !== "admin") {
            return res.json({ success: false, message: "Admin access denied." });
        }
        if (!req.body) req.body = {};
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Admin auth error:", error.message);
        res.json({ success: false, message: "Invalid or expired admin token." });
    }

};

export default adminAuth;
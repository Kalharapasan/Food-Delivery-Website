import { supabase } from "../config/Databases.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error || !user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user.id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Login error:", error);
        res.json({ success: false, message: "Login failed. Please try again." });
    }
};

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        const { data: exists } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (exists) {
            return res.json({ success: false, message: "An account with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data: newUser, error } = await supabase
            .from("users")
            .insert([{ name, email, password: hashedPassword, cartData: {} }])
            .select()
            .single();

        if (error) throw error;

        const token = createToken(newUser.id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Register error:", error);
        res.json({ success: false, message: "Registration failed. Please try again." });
    }
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error || !user) {
            return res.json({ success: false, message: "Admin account not found" });
        }

        if (user.role !== "admin") {
            return res.json({ success: false, message: "Not authorized as admin" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user.id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Admin login error:", error);
        res.json({ success: false, message: "Admin login failed. Please try again." });
    }
};

const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }
        const { data: exists } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();
        if (exists) {
            return res.json({ success: false, message: "An account with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const { data: newUser, error } = await supabase
            .from("users")
            .insert([{ name, email, password: hashedPassword, role: "admin", cartData: {} }])
            .select()
            .single();
        if (error) throw error;
        const token = createToken(newUser.id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Admin register error:", error);
        res.json({ success: false, message: "Admin registration failed. Please try again." });
    }

};

export { loginUser, registerUser, adminLogin, adminRegister };
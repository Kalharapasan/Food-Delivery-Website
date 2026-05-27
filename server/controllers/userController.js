import { supabase } from "../config/Databases.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
};


const loginUser = async (req, res) => {};

const registerUser = async (req, res) => {};

const adminLogin = async (req, res) => {};

const adminRegister = async (req, res) => {};

export { loginUser, registerUser, adminLogin, adminRegister };
import { supabase } from "../config/Databases.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {}
};


const loginUser = async (req, res) => {};

const registerUser = async (req, res) => {};

const adminLogin = async (req, res) => {};

const adminRegister = async (req, res) => {};

export { loginUser, registerUser, adminLogin, adminRegister };
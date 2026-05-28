import express from "express";
import { loginUser,registerUser,adminLogin, adminRegister } from "../controllers/userController.js";

const userRouter = express.Router();


export default userRouter;
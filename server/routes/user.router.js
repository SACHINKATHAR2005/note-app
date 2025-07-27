import express from "express";
import { getMyProfile, loginUser, registerUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",registerUser)

// http://localhost:5000/auth/register

router.post("/login",loginUser)

router.get("/me",auth,getMyProfile);




export default router;

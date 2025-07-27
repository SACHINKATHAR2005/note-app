import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieparser  from "cookie-parser";
import { connectDB } from "./db/db.js";

const app = express();
import userRouter from "./routes/user.router.js"
import noteRouter from "./routes/notes.router.js"

app.use(express.json());
app.use(cors({
    origin:"https://note-app-vert-kappa.vercel.app/",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],

}));
app.use(cookieparser());
app.use("/auth",userRouter);
app.use("/notes",noteRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
import express from "express";
import cors from "cors";
import connectDb from './config/db.js';
import dotenv from "dotenv"
dotenv.config()

import authRoutes from "../src/routes/routes.js";
import habitRoutes from "../src/routes/habitRoute.js"

const app = express();
connectDb()
app.use(cors({
  origin: "https://habit-tracker-cyan-five.vercel.app", 
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/auth",authRoutes)
app.use("/api/",habitRoutes)

app.listen(process.env.PORT,()=>{
console.log("server is running",process.env.PORT);
})
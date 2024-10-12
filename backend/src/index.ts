import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
console.log(process.env.FRONTEND_URL);
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000,()=>{
    console.log("server listening at 7000");
})


import express from "express";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoutes.js'
import taskRouter from './routes/taskRoutes.js'
import { errorMiddleware } from "./middleware/error.js";
import dotenv from 'dotenv'
import cors from 'cors'

export const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'] }));



app.use("/", userRouter);
app.use("/", taskRouter);


app.use(errorMiddleware);
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response } from "express";

const app = express();

// Define Here Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Define here Routes



export default app;

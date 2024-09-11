import dotenv from 'dotenv'; // Import dotenv
dotenv.config({ path: './config/config.env' }); // Load environment variables at the top

import { dbConnection } from './database/dbConnection.js'; // Import the database connection function
import express from 'express';
import cors from 'cors';
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Make sure this matches your frontend URL
  credentials: true, // Allows cookies to be sent cross-origin
};

// CORS setup
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // Use the frontend URL from the environment variables
        methods: ['POST'], // Allow POST requests
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);


 

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})



// Connect to the database
dbConnection();
app.use(errorMiddleware);

app.use(cors(corsOptions));


export default app;
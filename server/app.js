import express from 'express';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
const createApp = () =>{

    const app = express()

    // Middleware to parse JSON bodies
    app.use(express.json({ limit: '5mb' }));
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }))
    app.use(cookieParser());

    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes)

    return app;
}

export default createApp;
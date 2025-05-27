import express from 'express';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import cookieParser from 'cookie-parser';
const createApp = () =>{

    const app = express()

    // Middleware to parse JSON bodies
    app.use(express.json());

    app.use(cookieParser());

    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes)

    return app;
}

export default createApp;
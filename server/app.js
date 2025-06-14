import express from 'express';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

const createApp = () =>{

    const app = express();

    const __dirname = path.resolve();

    // Middleware to parse JSON bodies
    app.use(express.json({ limit: '5mb' }));
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }))
    app.use(cookieParser());

    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes);

    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname,'/client/dist')));

        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
        })
    }

    return app;
}

export default createApp;


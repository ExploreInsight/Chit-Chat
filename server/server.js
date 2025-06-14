import createApp from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import http from "http";
import { Server } from "socket.io";
import socketHandlers from "./lib/socket.js";
import { setScoketInstance } from "./lib/socket.js";

const startServer = async () => {
  try {
    dotenv.config();

    await connectDB();

    const app = createApp();
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
      path: "/socket.io",
    });

    setScoketInstance(io);

    socketHandlers(io);

    const PORT = process.env.PORT || 7012;

    server.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

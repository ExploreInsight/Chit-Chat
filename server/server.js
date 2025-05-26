import createApp from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

const startServer = async () => {
  try {
    dotenv.config();

    await connectDB();

    const app = createApp();

    const PORT = process.env.PORT || 7012;

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

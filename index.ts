import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app";

dotenv.config();

const PORT = process.env.PORT || 2001;
const DB_URL = process.env.DB_URL;

const startServer = async () => {
  try {
    // validate DB Url
    if (!DB_URL) {
      throw new Error("DB_URL is not defined in the enviornment file");
    }

    // Connect with Database
    await mongoose.connect(DB_URL);
    console.log("Successfully connected to the Database");

    // starting the server
    app
      .listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      })
      .on("error", (error: Error) => {
        console.error("❌ Error starting the server:", error.message);
        process.exit(1);
      });
  } catch (error) {
    console.error(" Error : ", error);
    process.exit(1);
  }
};

// Run the server
startServer();

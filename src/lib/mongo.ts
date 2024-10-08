import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

export async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      maxPoolSize: 10, // Maximum number of socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error occurred while connecting to DB!";
    console.error("MongoDB connection error:", errorMessage);
    throw new Error(errorMessage);
  }
}

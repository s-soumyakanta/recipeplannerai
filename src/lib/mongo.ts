import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?:number
}
const connection: ConnectionObject = {};

export async function connectDB():Promise<void> {
  if(connection.isConnected){
    console.log("Already DB connectd")
    return
  }
  try {
    const db = await mongoose.connect(String(process.env.MONGODB_URI));
     connection.isConnected = db.connections[0].readyState
     console.log("DB connected Successfully")
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred while connecting db!";
    throw new Error(errorMessage);
    process.exit(1);
  }
}

import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  location: {
    country: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  lastLogin?: Date;
  openAIToken?: string;
  compareToken(candidateToken: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  location: {
    country: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  lastLogin: {
    type: Date,
  },
  openAIToken: {
    type: String,
  }
});


export const User = mongoose?.models?.User ?? mongoose.model<IUser>("User", userSchema);

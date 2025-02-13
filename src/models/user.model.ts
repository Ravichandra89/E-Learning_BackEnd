import mongoose, { Document, Schema } from "mongoose";

export type userRole = "student" | "teacher" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: userRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  }
);


// UserModel
const userModel = mongoose.models.User || mongoose.model<IUser> ("User", userSchema);

export default userModel;
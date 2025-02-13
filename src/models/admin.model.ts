import { Schema } from "mongoose";
import UserModel, { IUser } from "./user.model";

/*
================== Admin Model + Base Model + Discriminator Key ==================
*/

// Interface for Admin Model
interface IAdmin extends IUser {
  profileSection: {
    bio: string;
    profilePicture: string;
    contactNumber: string;
  };
  adminRole: "super" | "content" | "finance" | "support";
  managedSections: string[];
  lastlogin: Date;
  permissions?: string[];
}

const adminSchema = new Schema({
  profileSection: {
    bio: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
  },
  adminRole: {
    type: String,
    enum: ["super", "content", "finance", "support"],
    required: true,
    default: "super",
  },
  managedSections: [
    {
      type: String,
      default: [],
    },
  ],
  lastlogin: {
    type: Date,
    default: Date.now(),
  },
  permissions: [
    {
      type: String,
      default: [],
    },
  ],
});

// Create the Admin Model
const adminModel = UserModel.discriminator<IAdmin>("Admin", adminSchema);

export default adminModel;

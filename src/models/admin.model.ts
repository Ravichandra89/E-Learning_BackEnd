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

/*
{
  "_id": "644a1e2f5b3c2d0012345678",
  "name": "Michael Smith",
  "email": "admin@example.com",
  "password": "$2b$10$hashedAdminPasswordExample",
  "role": "admin",
  "profileSection": {
    "bio": "Dedicated administrator ensuring smooth operations across the e-learning platform.",
    "profilePicture": "https://example.com/images/admin_profile.jpg",
    "contactNumber": "+1234567890"
  },
  "adminRole": "super",
  "managedSections": [
    "courses",
    "users",
    "reports"
  ],
  "lastlogin": "2025-03-01T10:30:00.000Z",
  "permissions": [
    "manage_users",
    "edit_courses",
    "view_reports"
  ],
  "createdAt": "2025-02-28T09:00:00.000Z",
  "updatedAt": "2025-03-01T10:30:00.000Z"
}

*/

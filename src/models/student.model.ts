import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.model";

/*
================== Student Model + Base Model + Discriminator Key ==================
*/

// Interface for Student Model
export interface IStudent extends IUser {
  courseEnrolled: mongoose.Types.ObjectId[];
  profileSection: {
    bio: string;
    profilePicture: string;
    contactNumber: string;
  };
  progress: mongoose.Types.ObjectId[];
  testSeries: mongoose.Types.ObjectId[];
  assignments: mongoose.Types.ObjectId[];
  quiz: mongoose.Types.ObjectId[];
  preferences?: {
    language?: string;
    notificationEnabled?: boolean;
  };
  achivements?: string[];
  enrollementDate: Date;
}

// Student Schema
const studentSchema = new Schema({
  courseEnrolled: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
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
  progress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Progress",
    required: false,
  },
  testSeries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestSeries", // Reference to your TestSeries model
    },
  ],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
  quiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  preferences: {
    language: {
      type: String,
      default: "English",
    },
    notificationEnabled: {
      type: Boolean,
      default: true,
    },
  },
  achivements: [
    {
      type: String,
      required: false,
    },
  ],
  enrollementDate: {
    type: Date,
    default: Date.now(),
  },
});

// Student Model
const studentModel =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);

export default studentModel;

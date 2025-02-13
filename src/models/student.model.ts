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

/*
{
  "_id": "642123456789abcdef012345",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "$2b$10$examplehashedpassword",
  "role": "student",
  "courseEnrolled": [
    "641f23456789abcdef012345",
    "641f23456789abcdef012346"
  ],
  "profileSection": {
    "bio": "Aspiring software engineer and avid learner.",
    "profilePicture": "https://example.com/profiles/jane.jpg",
    "contactNumber": "+1234567890"
  },
  "progress": "642223456789abcdef012347",
  "testSeries": [
    "642323456789abcdef012348",
    "642323456789abcdef012349"
  ],
  "assignments": [
    "642423456789abcdef012350"
  ],
  "quiz": [
    "642523456789abcdef012352",
    "642523456789abcdef012353"
  ],
  "preferences": {
    "language": "English",
    "notificationEnabled": true
  },
  "achivements": [
    "Completed Python Basics",
    "Top Scorer in Math Quiz"
  ],
  "enrollementDate": "2025-02-20T10:00:00.000Z",
  "createdAt": "2025-02-20T09:00:00.000Z",
  "updatedAt": "2025-02-20T09:30:00.000Z"
}

*/

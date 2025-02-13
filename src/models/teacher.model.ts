import { Schema } from "mongoose";
import UserModel, { IUser } from "./user.model";

/*
================== Teacher Model + Base Model + Discriminator Key ==================
*/

// Interface for Teacher Model
export interface ITeacher extends IUser {
  profileSection: {
    bio: string;
    profilePicture: string;
    contactNumber: string;
    qualification?: string;
    experience?: string;
    teachingSubjects?: string[];
  };
  courseTaught: Schema.Types.ObjectId[];
  preferences?: {
    language?: string;
    notificationEnabled?: boolean;
  };
}

const teacherSchema = new Schema({
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
    qualification: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    teachingSubjects: {
      type: [String],
      default: [],
    },
  },
  courseTaught: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const TeacherModel = UserModel.discriminator<ITeacher>(
  "Teacher",
  teacherSchema
);

export default TeacherModel;

/*
{
  "_id": "643e123456789abcdef01234",
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "password": "$2b$10$hashedpasswordexample",
  "role": "teacher",
  "profileSection": {
    "bio": "Experienced math teacher with a passion for inspiring students.",
    "profilePicture": "https://example.com/images/alice.jpg",
    "contactNumber": "+1234567890",
    "qualification": "Ph.D. in Mathematics",
    "experience": "10 years",
    "teachingSubjects": [
      "Mathematics",
      "Statistics"
    ]
  },
  "courseTaught": [
    "642a1f0e5d3f9a00123abcd1",
    "642a1f0e5d3f9a00123abcd2"
  ],
  "preferences": {
    "language": "en",
    "notificationEnabled": true
  },
  "createdAt": "2025-02-20T09:00:00.000Z",
  "updatedAt": "2025-02-20T09:30:00.000Z"
}

*/

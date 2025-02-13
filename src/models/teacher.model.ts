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


const TeacherModel = UserModel.discriminator<ITeacher>("Teacher", teacherSchema);

export default TeacherModel;
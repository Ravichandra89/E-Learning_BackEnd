import mongoose, { Schema, Document } from "mongoose";

export interface IProgress extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  progressPercentage: number;
  completedLectures: mongoose.Types.ObjectId[];
  completedModules: mongoose.Types.ObjectId[];
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema: Schema<IProgress> = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progressPercentage: {
      type: Number,
      default: 0,
    },
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture", // or "Course" if lectures are embedded; adjust accordingly
      },
    ],
    completedModules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProgressModel =
  mongoose.models.Progress ||
  mongoose.model<IProgress>("Progress", progressSchema);

export default ProgressModel;

/*
{
  "_id": "642f1a2c3e8b9a0012345678",
  "student": "642e9b2a3e8b9a0012345670",
  "course": "642d7c1b3e8b9a0012345671",
  "progressPercentage": 75,
  "completedLectures": [
    "642d7c1b3e8b9a0012345672",
    "642d7c1b3e8b9a0012345673",
    "642d7c1b3e8b9a0012345674"
  ],
  "completedModules": [
    "642d7c1b3e8b9a0012345675"
  ],
  "lastAccessed": "2025-03-01T12:00:00.000Z",
  "createdAt": "2025-02-28T10:30:00.000Z",
  "updatedAt": "2025-03-01T12:00:00.000Z"
}

*/

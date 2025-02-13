import mongoose, { Schema, Document } from "mongoose";

export interface ILiveClass extends Document {
  course: mongoose.Types.ObjectId;
  instructor: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  streamingUrl: string;
  status: "scheduled" | "ongoing" | "completed" | "cancelled"; // Status of the session
  createdAt: Date;
  updatedAt: Date;
}

const liveClassSchema: Schema<ILiveClass> = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    scheduledStart: {
      type: Date,
      required: true,
    },
    scheduledEnd: {
      type: Date,
      required: true,
    },
    streamingUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const LiveClassModel =
  mongoose.models.LiveClass ||
  mongoose.model<ILiveClass>("LiveClass", liveClassSchema);

export default LiveClassModel;

/*
 {
  "_id": "646f123456789abcdef01234",
  "course": "642a1f0e5d3f9a00123abcd1",
  "instructor": "643e123456789abcdef01234",
  "title": "Live Q&A Session: Algebra Basics",
  "description": "Join us for an interactive session covering the fundamentals of Algebra.",
  "scheduledStart": "2025-04-01T10:00:00.000Z",
  "scheduledEnd": "2025-04-01T11:00:00.000Z",
  "streamingUrl": "https://zoom.us/j/1234567890",
  "status": "scheduled",
  "createdAt": "2025-03-30T09:00:00.000Z",
  "updatedAt": "2025-03-30T09:00:00.000Z"
}

*/

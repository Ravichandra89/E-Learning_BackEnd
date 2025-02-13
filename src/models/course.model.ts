import mongoose, { Schema, Document } from "mongoose";

// Interface for Lecture subdocument
export interface ILecture {
  title: string;
  videoUrl: string;
  duration: number;
  resources?: string[];
}

// Interface for Module subdocument
export interface IModule {
  moduleTitle: string;
  moduleDescription?: string;
  lectures: ILecture[];
}

// Interface for Course model
export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructor: mongoose.Types.ObjectId;
  courseImage: string;
  prerequisites?: string;
  modules: IModule[];
  createdAt: Date;
  updatedAt: Date;
}

// Lecture Schema
const lectureSchema: Schema<ILecture> = new Schema({
  title: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  resources: [{ type: String }],
});

// Module Schema
const moduleSchema: Schema<IModule> = new Schema({
  moduleTitle: { type: String, required: true, trim: true },
  moduleDescription: { type: String, default: "" },
  lectures: [lectureSchema],
});

// Course Schema
const courseSchema: Schema<ICourse> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Reference to the Teacher model
      required: true,
    },
    courseImage: { type: String, default: "" },
    prerequisites: { type: String, default: "" },
    modules: [moduleSchema],
  },
  {
    timestamps: true,
  }
);

const CourseModel =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;

/* ============ Dummy Data ============ 

{
  "_id": "642a1f0e5d3f9a00123abcd1",
  "title": "Introduction to Algebra",
  "description": "Learn the basics of algebra including variables, equations, and functions.",
  "category": "Mathematics",
  "difficulty": "Beginner",
  "instructor": "641f23456789abcdef012345",
  "courseImage": "https://example.com/images/algebra-course.jpg",
  "prerequisites": "Basic arithmetic and an interest in solving problems.",
  "modules": [
    {
      "moduleTitle": "Module 1: Fundamentals",
      "moduleDescription": "Introduction to key algebraic concepts.",
      "lectures": [
        {
          "title": "Lecture 1: Understanding Variables",
          "videoUrl": "https://example.com/videos/lecture1.mp4",
          "duration": 600,
          "resources": [
            "https://example.com/resources/lecture1-notes.pdf"
          ]
        },
        {
          "title": "Lecture 2: Basic Equations",
          "videoUrl": "https://example.com/videos/lecture2.mp4",
          "duration": 750,
          "resources": [
            "https://example.com/resources/lecture2-cheatsheet.pdf"
          ]
        }
      ]
    },
    {
      "moduleTitle": "Module 2: Advanced Topics",
      "moduleDescription": "Diving deeper into algebra.",
      "lectures": [
        {
          "title": "Lecture 3: Quadratic Equations",
          "videoUrl": "https://example.com/videos/lecture3.mp4",
          "duration": 900,
          "resources": []
        }
      ]
    }
  ],
  "createdAt": "2025-02-20T09:00:00.000Z",
  "updatedAt": "2025-02-20T09:30:00.000Z"
}

*/

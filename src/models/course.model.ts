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
  courseType: "free" | "premium"; // New field for course type
  coursePrice: number; // New field for course price
  reviews?: mongoose.Types.ObjectId[]; // Connection for course reviews
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
    courseType: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
      required: true,
    },
    coursePrice: {
      type: Number,
      default: 0, // Default price is 0 for free courses
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseReview", // Reference to the CourseReview discriminator model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseModel =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;

/*
{
  "_id": "649a1f0e5d3f9a00123abcd1",
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming, including variables, loops, and functions.",
  "category": "Computer Science",
  "difficulty": "Beginner",
  "instructor": "642a1f0e5d3f9a00123abcf2",
  "courseImage": "https://example.com/images/intro_programming.jpg",
  "prerequisites": "No prior experience required.",
  "modules": [
    {
      "moduleTitle": "Module 1: Getting Started",
      "moduleDescription": "An introduction to basic programming concepts.",
      "lectures": [
        {
          "title": "Lecture 1: What is Programming?",
          "videoUrl": "https://example.com/videos/lecture1.mp4",
          "duration": 600,
          "resources": [
            "https://example.com/resources/lecture1-notes.pdf"
          ]
        },
        {
          "title": "Lecture 2: Setting Up Your Environment",
          "videoUrl": "https://example.com/videos/lecture2.mp4",
          "duration": 750,
          "resources": [
            "https://example.com/resources/lecture2-guide.pdf"
          ]
        }
      ]
    },
    {
      "moduleTitle": "Module 2: Basic Constructs",
      "moduleDescription": "Learn about variables, control structures, and loops.",
      "lectures": [
        {
          "title": "Lecture 3: Variables and Data Types",
          "videoUrl": "https://example.com/videos/lecture3.mp4",
          "duration": 900,
          "resources": []
        }
      ]
    }
  ],
  "courseType": "premium",
  "coursePrice": 49.99,
  "reviews": [
    "64bcd123456789abcdef01235",
    "64bcd123456789abcdef01236"
  ],
  "createdAt": "2025-03-01T09:00:00.000Z",
  "updatedAt": "2025-03-01T09:30:00.000Z"
}

*/

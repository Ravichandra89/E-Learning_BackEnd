import mongoose, { Schema, Document } from "mongoose";

// Interface for the Assignment model
export interface IAssignment extends Document {
  title: string;
  description: string;
  course: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  submissionFileUrl?: string;
  submissionText?: string;
  grade?: number;
  feedback?: string;
  dueDate: Date;
  status: "pending" | "submitted" | "graded";
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema: Schema<IAssignment> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    submissionFileUrl: {
      type: String,
      default: "",
    },
    submissionText: {
      type: String,
      default: "",
    },
    grade: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "submitted", "graded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const AssignmentModel =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", assignmentSchema);

export default AssignmentModel;

/*
{
  "_id": "645c1d3f9f1a2b0012345678",
  "title": "Linear Equations Assignment",
  "description": "Solve the set of linear equations provided in the attached document.",
  "course": "642a1f0e5d3f9a00123abcd1",
  "assignedBy": "643e123456789abcdef01234",
  "student": "642123456789abcdef012345",
  "submissionFileUrl": "https://example.com/submissions/assignment1_janedoe.pdf",
  "submissionText": "Please find my answers in the attached PDF file.",
  "grade": 92,
  "feedback": "Well done! Review question 3 for a better explanation.",
  "dueDate": "2025-03-05T23:59:00.000Z",
  "status": "graded",
  "createdAt": "2025-03-01T10:00:00.000Z",
  "updatedAt": "2025-03-06T08:30:00.000Z"
} 
*/

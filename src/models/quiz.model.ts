import mongoose, { Schema, Document } from "mongoose";

// Interface for a Question subdocument
export interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

// Interface for the Quiz model
export interface IQuiz extends Document {
  course: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  questions: IQuestion[];
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema: Schema<IQuestion> = new Schema({
  questionText: { type: String, required: true, trim: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  marks: { type: Number, required: true },
});

const quizSchema: Schema<IQuiz> = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Reference to the Course model
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    questions: [questionSchema],
    duration: { type: Number, default: 0 }, // Duration in minutes
  },
  {
    timestamps: true,
  }
);

const QuizModel =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", quizSchema);

export default QuizModel;

/*
 {
  "_id": "645a1f0e5d3f9a00123abcd1",
  "course": "642d7c1b3e8b9a0012345671",
  "title": "Introduction to Algebra Quiz",
  "description": "A quiz to test your understanding of basic algebra concepts.",
  "questions": [
    {
      "questionText": "What is the value of x in the equation 2x + 3 = 7?",
      "options": ["1", "2", "3", "4"],
      "correctAnswer": "2",
      "marks": 5
    },
    {
      "questionText": "Solve for x: 3x - 5 = 10.",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": "5",
      "marks": 5
    },
    {
      "questionText": "What is the solution of x + 2 = 5?",
      "options": ["2", "3", "4", "5"],
      "correctAnswer": "3",
      "marks": 5
    }
  ],
  "duration": 30,
  "createdAt": "2025-02-20T09:00:00.000Z",
  "updatedAt": "2025-02-20T09:30:00.000Z"
}

*/

import mongoose, { Schema, Document } from "mongoose";

// Interface for a Question subdocument
export interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

// Interface for a Test subdocument
export interface ITest {
  testTitle: string;
  testDate: Date;
  duration: number;
  questions: IQuestion[];
}

// Interface for the Test Series model
export interface ITestSeries extends Document {
  title: string;
  description: string;
  course: mongoose.Types.ObjectId;
  tests: ITest[];
  price: number;
  availableFrom?: Date;
  availableTo?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Question Schema
const questionSchema: Schema<IQuestion> = new Schema({
  questionText: { type: String, required: true, trim: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  marks: { type: Number, required: true },
});

// Test Schema
const testSchema: Schema<ITest> = new Schema({
  testTitle: { type: String, required: true, trim: true },
  testDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  questions: [questionSchema],
});

// Test Series Schema
const testSeriesSchema: Schema<ITestSeries> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    tests: [testSchema],
    price: { type: Number, default: 0 },
    availableFrom: { type: Date },
    availableTo: { type: Date },
  },
  { timestamps: true }
);

const TestSeriesModel =
  mongoose.models.TestSeries ||
  mongoose.model<ITestSeries>("TestSeries", testSeriesSchema);

export default TestSeriesModel;

/*
{
  "_id": "646e123456789abcdef01234",
  "title": "Algebra Test Series",
  "description": "A series of tests designed to evaluate your algebra skills.",
  "course": "642a1f0e5d3f9a00123abcd1",
  "tests": [
    {
      "testTitle": "Algebra Basics Test",
      "testDate": "2025-04-01T10:00:00.000Z",
      "duration": 60,
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
        }
      ]
    },
    {
      "testTitle": "Advanced Algebra Test",
      "testDate": "2025-04-15T10:00:00.000Z",
      "duration": 90,
      "questions": [
        {
          "questionText": "What is the solution for x in the equation x^2 - 4x + 3 = 0?",
          "options": ["1", "2", "3", "4"],
          "correctAnswer": "1",
          "marks": 10
        }
      ]
    }
  ],
  "price": 49.99,
  "availableFrom": "2025-04-01T00:00:00.000Z",
  "availableTo": "2025-04-30T23:59:59.000Z",
  "createdAt": "2025-03-01T08:00:00.000Z",
  "updatedAt": "2025-03-01T08:00:00.000Z"
}

*/

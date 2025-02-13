import mongoose, { Schema } from "mongoose";
import reviewModel, { IReview } from "./review.model";

export interface ICourseReview extends Document {
  course: mongoose.Types.ObjectId;
}

const courseReviewSchema: Schema<ICourseReview> = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

export const courseReview = reviewModel.discriminator<ICourseReview>(
  "courseReview",
  courseReviewSchema
);

/*
{
  "_id": "64bcd123456789abcdef01234",
  "user": "642123456789abcdef012345",
  "rating": 5,
  "comment": "Excellent course! Very well structured and informative.",
  "images": [],
  "reviewType": "courseReview",
  "course": "642a1f0e5d3f9a00123abcd1",
  "createdAt": "2025-04-01T10:00:00.000Z",
  "updatedAt": "2025-04-01T10:00:00.000Z"
}

*/

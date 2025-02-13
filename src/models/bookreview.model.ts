import mongoose, { Schema } from "mongoose";
import reviewModel, { IReview } from "./review.model";

export interface IBookReview extends IReview {
  book: mongoose.Types.ObjectId;
}

const bookReviewSchema: Schema<IBookReview> = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
});

export const BookReview = reviewModel.discriminator<IBookReview>(
  "bookReview",
  bookReviewSchema
);

/*
{
  "_id": "64bcd123456789abcdef01235",
  "user": "642123456789abcdef012345",
  "rating": 4,
  "comment": "This book provided great insights into modern web development.",
  "images": [
    "https://example.com/review-image1.jpg"
  ],
  "reviewType": "bookReview",
  "book": "64abc123456789abcdef01234",
  "createdAt": "2025-04-01T11:00:00.000Z",
  "updatedAt": "2025-04-01T11:00:00.000Z"
}

*/

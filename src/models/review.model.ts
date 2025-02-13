import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<IReview> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    discriminatorKey: "reviewType",
  }
);

const reviewModel =
  mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default reviewModel;

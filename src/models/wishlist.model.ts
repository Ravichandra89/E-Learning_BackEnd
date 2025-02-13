import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  books: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema: Schema<IWishlist> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

const wishlistModel =
  mongoose.models.Wihlist || mongoose.model("Wishlist", wishlistSchema);

export default wishlistModel;

/*
{
  "_id": "64abc123456789abcdef01234",
  "user": "642123456789abcdef012345",
  "books": [
    "648b1f0a5d3f9a00123abcde",
    "648b1f0a5d3f9a00123abcdf"
  ],
  "createdAt": "2025-04-01T10:00:00.000Z",
  "updatedAt": "2025-04-01T10:00:00.000Z"
}

*/

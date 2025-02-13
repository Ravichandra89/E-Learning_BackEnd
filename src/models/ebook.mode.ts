import mongoose, { Schema, Document } from "mongoose";

export type BookType = "ebook" | "physical";

export interface IBook extends Document {
  title: string;
  description: string;
  author: string;
  price: number;
  bookType: BookType;
  coverImage: string;
  inventoryCount?: number;
  downloadUrl?: string;
  categories: string[];
  reviews?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    bookType: {
      type: String,
      enum: ["ebook", "physical"],
      required: true,
    },
    coverImage: { type: String, default: "" },
    inventoryCount: { type: Number, default: 0 },
    downloadUrl: { type: String, default: "" },
    categories: [{ type: String }],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookReview",
      },
    ],
  },
  { timestamps: true }
);

const BookModel =
  mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);

export default BookModel;

/*
{
  "_id": "64abc123456789abcdef01234",
  "title": "Learn JavaScript",
  "description": "A comprehensive guide to JavaScript for beginners.",
  "author": "John Doe",
  "price": 19.99,
  "bookType": "ebook",
  "coverImage": "https://example.com/images/js-book.jpg",
  "downloadUrl": "https://example.com/downloads/js-book.pdf",
  "categories": ["Programming", "JavaScript"],
  "reviews": [
    "64bcd123456789abcdef01235",
    "64bcd123456789abcdef01236"
  ],
  "createdAt": "2025-04-01T09:00:00.000Z",
  "updatedAt": "2025-04-01T09:00:00.000Z"
}

*/

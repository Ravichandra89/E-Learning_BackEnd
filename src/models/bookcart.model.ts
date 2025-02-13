import mongoose, { Schema, Document } from "mongoose";

// Interface for each cart item
export interface ICartItem {
  book: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

// Interface for the Cart model
export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for individual cart items
const cartItemSchema: Schema<ICartItem> = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Main Cart schema
const cartSchema: Schema<ICart> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const CartModel =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default CartModel;

/*
{
  "_id": "649a1e0e5d3f9a00123abcd1",
  "user": "642123456789abcdef012345",
  "items": [
    {
      "book": "648b1f0a5d3f9a00123abcde",
      "quantity": 2,
      "price": 15.99
    },
    {
      "book": "648b1f0a5d3f9a00123abcdf",
      "quantity": 1,
      "price": 29.99
    }
  ],
  "totalAmount": 61.97,
  "createdAt": "2025-04-01T10:00:00.000Z",
  "updatedAt": "2025-04-01T10:05:00.000Z"
}

*/

import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItemSnapshot {
  book: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

// Interface for Shipping Address
export interface IShippingAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

// Interface for the Order model
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItemSnapshot[];
  shoppingAddress: IShippingAddress;
  totalAmount: number;
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSnapshotSchema: Schema<IOrderItemSnapshot> = new Schema({
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

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSnapshotSchema],
    shoppingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;

/*
{
  "_id": "64bcd123456789abcdef01234",
  "user": "642123456789abcdef012345",
  "orderItems": [
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
  "shoppingAddress": {
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "postalCode": "10001"
  },
  "totalAmount": 61.97,
  "orderStatus": "pending",
  "createdAt": "2025-04-01T10:00:00.000Z",
  "updatedAt": "2025-04-01T10:05:00.000Z"
}

*/

import mongoose, { Schema, Document } from "mongoose";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentMethod =
  | "credit_card"
  | "paypal"
  | "bank_transfer"
  | "crypto";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User who made the payment
  course?: mongoose.Types.ObjectId; // Optional: Reference to the Course purchased (if applicable)
  amount: number; // Payment amount
  currency: string; // Currency code, e.g., "USD", "EUR"
  paymentMethod: PaymentMethod; // Payment method used
  status: PaymentStatus; // Current status of the payment
  transactionId: string; // External transaction ID from the payment gateway
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema: Schema<IPayment> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Optional: Only if the payment is for a specific course
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "crypto"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PaymentModel =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;

/*
{
  "_id": "648a1f0e5d3f9a00123abcd1",
  "user": "642123456789abcdef012345",
  "course": "642a1f0e5d3f9a00123abcd2",
  "amount": 49.99, // Taken from the Course Price
  "currency": "USD",
  "paymentMethod": "credit_card",
  "status": "completed",
  "transactionId": "txn_1234567890",
  "createdAt": "2025-04-01T10:00:00.000Z",
  "updatedAt": "2025-04-01T10:05:00.000Z"
}

*/

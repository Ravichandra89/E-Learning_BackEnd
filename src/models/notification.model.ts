import mongoose, { Schema, Document } from "mongoose";

// Interface for Notification Model
export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: "live-class" | "course-update" | "assignment" | "quiz" | "general";
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema: Schema<INotification> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["live-class", "course-update", "assignment", "quiz", "general"],
      default: "general",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);

export default NotificationModel;

/*
 {
  "_id": "647e123456789abcdef01234",
  "user": "642123456789abcdef012345",
  "title": "Upcoming Live Class Reminder",
  "message": "Your live class on Algebra Basics starts in 30 minutes. Please join via the provided link.",
  "type": "live-class",
  "read": false,
  "createdAt": "2025-04-01T09:30:00.000Z",
  "updatedAt": "2025-04-01T09:30:00.000Z"
}

*/

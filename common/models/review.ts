import mongoose from "mongoose";
import { Review } from "../types/review";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    kitchen: {
      type: Number,
      required: true,
    },
    location: {
      type: Number,
      required: true,
    },
    overall: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Review & mongoose.Document>(
  "Review",
  reviewSchema
);

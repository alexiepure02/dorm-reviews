import { model, models, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    dorm: { type: Schema.Types.ObjectId, ref: "Dorm" },
    likes: {
      type: Number,
      required: true,
    },
    roomRating: {
      type: Number,
      required: true,
    },
    roomComment: {
      type: String,
    },
    bathRating: {
      type: Number,
      required: true,
    },
    bathComment: {
      type: String,
    },
    kitchenRating: {
      type: Number,
      required: true,
    },
    kitchenComment: {
      type: String,
    },
    locationRating: {
      type: Number,
      required: true,
    },
    locationComment: {
      type: String,
    },
    overallRating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    imageIndexes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);
export default Review;

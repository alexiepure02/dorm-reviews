import mongoose from "mongoose";
import { Dorm } from "../types/dorm";

const dormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Dorm & mongoose.Document>("Dorm", dormSchema);

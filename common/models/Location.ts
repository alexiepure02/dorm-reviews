import { model, models, Schema } from "mongoose";

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Location = models.Location || model("Location", locationSchema);
export default Location;

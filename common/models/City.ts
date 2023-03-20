import { model, models, Schema } from "mongoose";

const citySchema = new Schema(
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
  },
  { timestamps: true }
);

const City = models.City || model("City", citySchema);
export default City;

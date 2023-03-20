import { model, models, Schema } from "mongoose";

const universitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const University = models.University || model("University", universitySchema);
export default University;

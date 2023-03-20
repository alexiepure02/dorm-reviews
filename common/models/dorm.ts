import { model, models, Schema } from "mongoose";

const dormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    university: { type: Schema.Types.ObjectId, ref: "University" },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Dorm = models.Dorm || model("Dorm", dormSchema);
export default Dorm;

import { model, models, Schema } from "mongoose";

const dormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    university: { type: Schema.Types.ObjectId, ref: "University" },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Dorm = models.Dorm || model("Dorm", dormSchema);
export default Dorm;

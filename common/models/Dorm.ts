import { model, models, Schema } from "mongoose";

const dormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    position: {
      type: [],
      required: true,
    },
    university: { type: Schema.Types.ObjectId, ref: "University" },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
  },
  { timestamps: true }
);

const Dorm = models.Dorm || model("Dorm", dormSchema);
export default Dorm;

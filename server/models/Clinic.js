import mongoose from "mongoose";
import { Schema } from "mongoose";
import VersionSchema from "./VersionSchema";

//create schema
const clinicSchema = new VersionSchema({
  name: {
    type: String,
    required: true
  },
  procedures: [{ type: Schema.Types.ObjectId, ref: "procedures" }],
  feedbacks: [{ type: Object }],
  location: {
    type: Schema.Types.ObjectId,
    ref: "places"
  },
  address: {
    type: String
  },
  telephone: {
    type: String
  },
  description: {
    type: String
  },
  imgs: {
    type: [String]
  }
});

const Clinic = mongoose.model("clinics", clinicSchema);
export default Clinic;

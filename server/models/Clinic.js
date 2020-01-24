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
  feedBack: {
    type: Object
  },
  location: {
    type: String
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
    type: Array
  }
});

const Clinic = mongoose.model("clinics", clinicSchema);
export default Clinic;

import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
import { Schema } from "mongoose";
//Create Schema
const ClinicRateSchema = new VersionSchema({
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: "clinics",
    required: true
  },
  rateTypeId: {
    type: Schema.Types.ObjectId,
    ref: "ratetypes",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

const ClinicRate = mongoose.model("clinicrates", ClinicRateSchema);
export default ClinicRate;

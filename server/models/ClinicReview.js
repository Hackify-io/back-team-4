import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
import { Schema } from "mongoose";
//Create Schema
const ClinicReviewSchema = new VersionSchema({
  clinic: {
    type: Schema.Types.ObjectId,
    ref: "clinics",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  review: {
    username: "string",
    message: "string"
  }
});

const ClinicReview = mongoose.model("clinicreviews", ClinicReviewSchema);
export default ClinicReview;

import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const ClinicReviewSchema = new VersionSchema({
    clinicId: {
        type: Schema.Types.ObjectId,
        ref: 'clinics',
        required: true
      }, 
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      review:{
          "username": 'string',
          "message": 'string'
      }
});

const ClinicReview = mongoose.model("clinicreviews", ClinicReviewSchema);
export default ClinicReview;
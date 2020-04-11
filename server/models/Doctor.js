import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import VersionSchema from "./VersionSchema";
//Create Schema
const DoctorSchema = new VersionSchema({
  name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  expertiseTime: {
    years: "number",
    months: "number",
  },
});
DoctorSchema.plugin(mongoosePaginate);
const Doctor = mongoose.model("doctors", DoctorSchema);
export default Doctor;

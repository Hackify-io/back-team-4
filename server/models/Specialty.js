import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const SpecialtySchema = new VersionSchema({
  name: {
    type: String,
    required: true
  },
  imageUrl:{
    type:String,
    required:true
  }
});

const Specialty = mongoose.model("specialties", SpecialtySchema);
export default Specialty;

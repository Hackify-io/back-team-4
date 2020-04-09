import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import VersionSchema from "./VersionSchema";
//Create Schema
const SpecialtySchema = new VersionSchema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

SpecialtySchema.plugin(mongoosePaginate);

const Specialty = mongoose.model("specialties", SpecialtySchema);
export default Specialty;

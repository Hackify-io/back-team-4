import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const RateSchema = new VersionSchema({
  name: {
    type: String,
    required: true
  }
});

const Rate = mongoose.model("ratetypes", RateSchema);
export default Rate;

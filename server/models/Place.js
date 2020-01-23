import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const PlaceSchema = new VersionSchema({
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

const Place = mongoose.model("places", PlaceSchema);
export default Place;

import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const EventSchema = new VersionSchema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const Event = mongoose.model("events", EventSchema);
export default Event;

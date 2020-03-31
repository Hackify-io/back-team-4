import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const BlogSchema = new VersionSchema({
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

const Blog = mongoose.model("blogs", BlogSchema);
export default Blog;

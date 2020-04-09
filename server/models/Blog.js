import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import VersionSchema from "./VersionSchema";
//Create Schema
const BlogSchema = new VersionSchema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  displayImage: {
    type: String,
  },
});
BlogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("blogs", BlogSchema);
export default Blog;

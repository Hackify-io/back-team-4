import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import VersionSchema from "./VersionSchema";
//Create Schema
const FooSchema = new VersionSchema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
FooSchema.plugin(mongoosePaginate);
const Foo = mongoose.model("foos", FooSchema);
export default Foo;

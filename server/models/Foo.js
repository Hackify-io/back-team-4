import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const FooSchema = new VersionSchema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const Foo = mongoose.model("foos", FooSchema);
export default Foo;

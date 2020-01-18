import mongoose from "mongoose";
import { Schema } from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const FooChildSchema = new VersionSchema({
  foo: {
    type: Schema.Types.ObjectId,
    ref: "foos"
  },
  relationshipType: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

const FooChild = mongoose.model("foochildren", FooChildSchema);
export default FooChild;

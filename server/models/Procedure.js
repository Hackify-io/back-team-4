import mongoose from "mongoose";
import VersionSchema from "./VersionSchema";
//Create Schema
const ProcedureSchema = new VersionSchema({
  name: {
    type: String,
    required: true
  }
});

const Procedure = mongoose.model("procedures", ProcedureSchema);
export default Procedure;

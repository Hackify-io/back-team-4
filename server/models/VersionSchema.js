import { Schema } from "mongoose";
import uuid from "uuid";

const genuuid = uuid.v4;
//Create Schema
class VersionSchema {
  constructor(params) {
    const schema = new Schema({
      coorelationId: {
        type: String,
        required: true,
        default: genuuid(),
        auto: true,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
      createdUser: {
        type: String,
        required: true,
      },
      modifiedDate: {
        type: Date,
        default: Date.now,
      },
      modifiedUser: {
        type: String,
        required: true,
      },
    });
    schema.add(params);
    return schema;
  }
}

export default VersionSchema;

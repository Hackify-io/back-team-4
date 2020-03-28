import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import VersionSchema from './VersionSchema';

//create schema
const userSchema = new VersionSchema({
  loginId: {
    type: Schema.Types.ObjectId,
    ref: 'logins',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar : {
    type: String
  }
});

const User = mongoose.model('users', userSchema);
export default User;

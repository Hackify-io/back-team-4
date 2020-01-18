import mongoose from 'mongoose';
import VersionSchema from './VersionSchema';

//create schema
const userSchema = new VersionSchema({
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
  }
});

const User = mongoose.model('users', userSchema);
export default User;

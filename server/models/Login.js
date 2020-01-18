import mongoose from 'mongoose';
import VersionSchema from './VersionSchema';

//Create Schema
const LoginSchema = new VersionSchema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const Login = mongoose.model('logins', LoginSchema);
export default Login;

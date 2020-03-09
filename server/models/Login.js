import VersionSchema from './VersionSchema';
import mongoose from 'mongoose';
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
  },
  externalLogins: [{provider:'string', id: 'string'}]
});

const Login = mongoose.model('logins', LoginSchema);
export default Login;

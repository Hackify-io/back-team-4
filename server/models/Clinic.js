import mongoose from 'mongoose';
import VersionSchema from './VersionSchema';

//create schema
const clinicSchema = new VersionSchema({
  name: {
    type: String,
    required: true
  },
  procedures: {
    type: Array
  },
  feedBack: {
    type: Object
  },
  location: {
    type: String
  },
  address: {
    type: String
  },
  telephone: {
    type: String
  }
  //TODO
  //reference to type contact
});

const Clinic = mongoose.model('clinics', clinicSchema);
export default Clinic;

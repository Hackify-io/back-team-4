import mongoose from 'mongoose';
import VersionSchema from './VersionSchema';

//create schema
const clinicSchema = new VersionSchema({
  name: {
    type: String,
    required: true
  }
  //TODO
  //reference to type contact
});

const Clinic = mongoose.model('clinics', clinicSchema);
export default Clinic;

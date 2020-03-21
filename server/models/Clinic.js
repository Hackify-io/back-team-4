import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import VersionSchema from './VersionSchema';

//create schema
const clinicSchema = new VersionSchema({
  loginId: {
    type: Schema.Types.ObjectId,
    ref: 'logins',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  specialties: [{ type: Schema.Types.ObjectId, ref: 'specialties' }],
  feedbacks: [{ type: Object }],
  location: {
    type: Schema.Types.ObjectId,
    ref: 'places'
  },
  imgs: {
    type: [String]
  }
});

const Clinic = mongoose.model('clinics', clinicSchema);
export default Clinic;

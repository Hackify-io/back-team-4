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
  images: {
    type: [String]
  },
  specialties: [{ type: Schema.Types.ObjectId, ref: 'specialties' }],
  location: {
    type: Schema.Types.ObjectId,
    ref: 'places'
  },
  doctors: [{ type: Schema.Types.ObjectId, ref: 'doctors' }],
  rates: [{type: Schema.Types.ObjectId, ref: 'clinicrates'}],
  reviews: [{type: Schema.Types.ObjectId, ref: 'clinicreviews'}],
  averageTime: {
    hours:'number',
    minutes:'number'
  },
  averageCost: {
    type: Number
  }
});

const Clinic = mongoose.model('clinics', clinicSchema);
export default Clinic;

import mongoose from 'mongoose';
import VersionSchema from './VersionSchema';
import { Schema } from 'mongoose';
//Create Schema
const ClinicRateSchema = new VersionSchema({
  clinic: {
    type: Schema.Types.ObjectId,
    ref: 'clinics',
    required: true,
  },
  rateType: {
    type: Schema.Types.ObjectId,
    ref: 'ratetypes',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const ClinicRate = mongoose.model('clinicrates', ClinicRateSchema);
export default ClinicRate;

import mongoose from 'mongoose';
import VersionSchema from './VersionSchema';
import { Schema } from 'mongoose';
//Create Schema
const AppointmentSchema = new VersionSchema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: 'clinics',
    required: true
  },
  date: {
    type: String
  },
  status: {
    type: String
  }
});

const Appointment = mongoose.model('appointments', AppointmentSchema);
export default Appointment;

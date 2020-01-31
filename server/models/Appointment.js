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
  userName: {
    type: String
  },
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: 'clinics',
    required: true
  },
  procedure: {
    type: Schema.Types.ObjectId,
    ref: 'procedures',
    required: true
  },
  date: {
    type: Date
  },
  time: {
    type: Number
  },
  status: {
    type: String
  }
});

const Appointment = mongoose.model('appointments', AppointmentSchema);
export default Appointment;

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import VersionSchema from './VersionSchema';
//Create Schema
const EventSchema = new VersionSchema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  displayImage: {
    type: String,
  },
});
EventSchema.plugin(mongoosePaginate);
const Event = mongoose.model('events', EventSchema);
export default Event;

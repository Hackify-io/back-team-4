import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import VersionSchema from './VersionSchema';
//Create Schema
const PlaceSchema = new VersionSchema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

PlaceSchema.plugin(mongoosePaginate);

const Place = mongoose.model('places', PlaceSchema);
export default Place;

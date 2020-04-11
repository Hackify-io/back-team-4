'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _VersionSchema = require('./VersionSchema');

var _VersionSchema2 = _interopRequireDefault(_VersionSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create schema
var clinicSchema = new _VersionSchema2.default({
  loginId: {
    type: _mongoose.Schema.Types.ObjectId,
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
  specialties: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'specialties' }],
  location: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'places'
  },
  doctors: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'doctors' }],
  rates: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'clinicrates' }],
  reviews: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'clinicreviews' }],
  averageTime: {
    hours: 'number',
    minutes: 'number'
  },
  averageCost: {
    type: Number
  }
});

var Clinic = _mongoose2.default.model('clinics', clinicSchema);
exports.default = Clinic;
//# sourceMappingURL=Clinic.js.map
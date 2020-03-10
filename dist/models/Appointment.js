'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _VersionSchema = require('./VersionSchema');

var _VersionSchema2 = _interopRequireDefault(_VersionSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create Schema
var AppointmentSchema = new _VersionSchema2.default({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  userName: {
    type: String
  },
  clinicId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'clinics',
    required: true
  },
  procedure: {
    type: _mongoose.Schema.Types.ObjectId,
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

var Appointment = _mongoose2.default.model('appointments', AppointmentSchema);
exports.default = Appointment;
//# sourceMappingURL=Appointment.js.map
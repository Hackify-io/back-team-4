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
  procedures: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'procedures' }],
  feedbacks: [{ type: Object }],
  location: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'places'
  },
  address: {
    type: String
  },
  telephone: {
    type: String
  },
  description: {
    type: String
  },
  imgs: {
    type: [String]
  }
});

var Clinic = _mongoose2.default.model('clinics', clinicSchema);
exports.default = Clinic;
//# sourceMappingURL=Clinic.js.map
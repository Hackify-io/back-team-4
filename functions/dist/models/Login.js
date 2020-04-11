'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VersionSchema = require('./VersionSchema');

var _VersionSchema2 = _interopRequireDefault(_VersionSchema);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create Schema
var LoginSchema = new _VersionSchema2.default({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  externalLogins: [{ provider: 'string', id: 'string' }]
});

var Login = _mongoose2.default.model('logins', LoginSchema);
exports.default = Login;
//# sourceMappingURL=Login.js.map
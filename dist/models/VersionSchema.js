'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var genuuid = _uuid2.default.v4;
//Create Schema

var VersionSchema = function VersionSchema(params) {
  _classCallCheck(this, VersionSchema);

  var schema = new _mongoose.Schema({
    coorelationId: {
      type: String,
      required: true,
      default: genuuid(),
      auto: true
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    createdUser: {
      type: String
    },
    modifiedDate: {
      type: Date,
      default: Date.now
    },
    modifiedUser: {
      type: String
    }
  });
  schema.add(params);
  return schema;
};

exports.default = VersionSchema;
//# sourceMappingURL=VersionSchema.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _VersionSchema = require("./VersionSchema");

var _VersionSchema2 = _interopRequireDefault(_VersionSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create Schema
var FooChildSchema = new _VersionSchema2.default({
  foo: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "foos"
  },
  relationshipType: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

var FooChild = _mongoose2.default.model("foochildren", FooChildSchema);
exports.default = FooChild;
//# sourceMappingURL=FooChild.js.map
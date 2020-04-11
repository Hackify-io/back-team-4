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
var FooSchema = new _VersionSchema2.default({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

var Foo = _mongoose2.default.model("foos", FooSchema);
exports.default = Foo;
//# sourceMappingURL=Foo.js.map
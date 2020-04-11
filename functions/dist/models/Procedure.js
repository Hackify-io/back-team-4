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
var ProcedureSchema = new _VersionSchema2.default({
  name: {
    type: String,
    required: true
  }
});

var Procedure = _mongoose2.default.model("procedures", ProcedureSchema);
exports.default = Procedure;
//# sourceMappingURL=Procedure.js.map
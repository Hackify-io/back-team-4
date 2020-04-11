"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateClinicFields = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require("./is-empty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateClinicFields = exports.validateClinicFields = function validateClinicFields(data) {
  var errors = {};

  data.name = (0, _isEmpty.isRequired)(data.name);

  if (_validator2.default.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=clinic.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAppointmentFields = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require("./is-empty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateAppointmentFields = exports.validateAppointmentFields = function validateAppointmentFields(data) {
  var errors = {};

  data.Date = (0, _isEmpty.isRequired)(data.date);

  if (_validator2.default.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=appointment.js.map
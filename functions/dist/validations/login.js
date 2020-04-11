"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegisterFields = exports.validateLoginFields = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require("./is-empty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateLoginFields = exports.validateLoginFields = function validateLoginFields(data) {
  var errors = {};

  data.email = (0, _isEmpty.isRequired)(data.email);
  data.password = (0, _isEmpty.isRequired)(data.password);

  if (_validator2.default.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (_validator2.default.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};

var validateRegisterFields = exports.validateRegisterFields = function validateRegisterFields(data) {
  var errors = {};

  data.email = (0, _isEmpty.isRequired)(data.email);
  data.password = (0, _isEmpty.isRequired)(data.password);

  if (_validator2.default.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!_validator2.default.isEmail(data.email)) {
    errors.email = "Email field is incorrectly formated";
  }

  if (_validator2.default.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=login.js.map
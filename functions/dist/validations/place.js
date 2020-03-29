"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePlaceFields = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require("./is-empty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validatePlaceFields = exports.validatePlaceFields = function validatePlaceFields(data) {
  var errors = {};

  data.country = (0, _isEmpty.isRequired)(data.country);
  data.city = (0, _isEmpty.isRequired)(data.city);

  if (_validator2.default.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }
  if (_validator2.default.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=place.js.map
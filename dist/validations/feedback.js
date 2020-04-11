"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFeedbackFields = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require("./is-empty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateFeedbackFields = exports.validateFeedbackFields = function validateFeedbackFields(data) {
  var errors = {};
  //If the values are null set to empty string
  data.user = (0, _isEmpty.isRequired)(data.user);
  data.rate = (0, _isEmpty.isRequired)(data.rate);
  data.message = (0, _isEmpty.isRequired)(data.message);

  if (_validator2.default.isEmpty(data.user)) {
    errors.user = "user field is required";
  }
  if (_validator2.default.isEmpty(data.user)) {
    errors.rate = "rate field is required";
  }
  if (_validator2.default.isEmpty(data.message)) {
    errors.message = "message field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=feedback.js.map
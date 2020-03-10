'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFooFields = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./is-empty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateFooFields = exports.validateFooFields = function validateFooFields(data) {
  var errors = {};
  //If the values are null set to empty string
  data.key = (0, _isEmpty.isRequired)(data.key);
  data.value = (0, _isEmpty.isRequired)(data.value);

  if (!_validator2.default.isLength(data.key, { min: 3, max: 10 })) {
    errors.key = 'key must be between 3 and 10 characters';
  }

  if (_validator2.default.isEmpty(data.key)) {
    errors.key = 'key field is required';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=foo.js.map
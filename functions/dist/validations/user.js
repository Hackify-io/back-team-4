'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserFields = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./is-empty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateUserFields = exports.validateUserFields = function validateUserFields(data) {
  var errors = {};

  data.name = (0, _isEmpty.isRequired)(data.name);
  data.lastname = (0, _isEmpty.isRequired)(data.lastname);
  //data.age = isRequired(data.age);
  data.gender = (0, _isEmpty.isRequired)(data.gender);

  if (_validator2.default.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (_validator2.default.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname field is required';
  }

  if (data.age === undefined) {
    errors.age = 'Age field is required';
  }

  if (_validator2.default.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=user.js.map
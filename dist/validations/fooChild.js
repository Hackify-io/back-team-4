'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFooChildFields = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./is-empty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateFooChildFields = exports.validateFooChildFields = function validateFooChildFields(data) {
  var errors = {};
  //If the values are null set to empty string
  data.RelationshipType = (0, _isEmpty.isRequired)(data.relationshipType);

  if (_validator2.default.isEmpty(data.relationshipType)) {
    errors.key = 'relationshipType field is required';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};
//# sourceMappingURL=fooChild.js.map
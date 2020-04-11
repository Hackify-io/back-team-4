import Validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateFooChildFields = (data) => {
  let errors = {};
  //If the values are null set to empty string
  data.RelationshipType = isRequired(data.relationshipType);

  if (Validator.isEmpty(data.relationshipType)) {
    errors.key = 'relationshipType field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

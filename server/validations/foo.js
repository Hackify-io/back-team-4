import Validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateFooFields = (data) => {
  let errors = {};
  //If the values are null set to empty string
  data.key = isRequired(data.key);
  data.value = isRequired(data.value);

  if (!Validator.isLength(data.key, { min: 3, max: 10 })) {
    errors.key = 'key must be between 3 and 10 characters';
  }

  if (Validator.isEmpty(data.key)) {
    errors.key = 'key field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

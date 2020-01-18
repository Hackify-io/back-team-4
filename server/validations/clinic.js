import validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateClinicFields = data => {
  let errors = {};

  data.name = isRequired(data.name);

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

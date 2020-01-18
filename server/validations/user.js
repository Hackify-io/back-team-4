import validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateUserFields = data => {
  let errors = {};

  data.name = isRequired(data.name);
  data.lastname = isRequired(data.lastname);
  data.age = isRequired(data.age);
  data.gender = isRequired(data.gender);

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname field is required';
  }

  if (validator.isInt(data.age)) {
    errors.age = 'Age field should be a number';
  }

  if (validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

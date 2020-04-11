import validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateLoginFields = (data) => {
  let errors = {};

  data.email = isRequired(data.email);
  data.password = isRequired(data.password);

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateRegisterFields = (data) => {
  let errors = {};

  data.email = isRequired(data.email);
  data.password = isRequired(data.password);

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email field is incorrectly formated';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

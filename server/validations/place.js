import validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validatePlaceFields = (data) => {
  let errors = {};

  data.country = isRequired(data.country);
  data.city = isRequired(data.city);

  if (validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }
  if (validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

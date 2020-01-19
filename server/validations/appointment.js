import validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateAppointmentFields = data => {
  let errors = {};

  data.Date = isRequired(data.Date);

  if (validator.isEmpty(data.Date)) {
    errors.Date = 'Date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

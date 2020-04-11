import validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateAppointmentFields = (data) => {
  let errors = {};

  data.Date = isRequired(data.date);

  if (validator.isEmpty(data.date)) {
    errors.date = 'Date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

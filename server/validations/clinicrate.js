import Validator from 'validator';
import { isEmpty, isRequired } from './is-empty';

export const validateClinicRateFields = (data) => {
  let errors = {};

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

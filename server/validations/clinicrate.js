import validator from "validator";
import { isEmpty, isRequired } from "./is-empty";

export const validateClinicRateFields = data => {
  let errors = {};

  data.user = isRequired(data.user);
  data.value = isRequired(data.value);

  if (Validator.isEmpty(data.clinic)) {
    errors.clinic = "clinic field is required";
  }
  if (Validator.isEmpty(data.user)) {
    errors.user = "user field is required";
  }
  if (Validator.isEmpty(data.review.username)) {
    errors.review = "username field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

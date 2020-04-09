import validator from "validator";
import { isEmpty, isRequired } from "./is-empty";

export const validateEventFields = data => {
  let errors = {};

  data.title = isRequired(data.country);
  data.description = isRequired(data.degree);

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

import Validator from "validator";
import { isEmpty, isRequired } from "./is-empty";

export const validateFeedbackFields = data => {
  let errors = {};
  //If the values are null set to empty string
  data.user = isRequired(data.user);
  data.rate = isRequired(data.rate);
  data.message = isRequired(data.message);

  if (Validator.isEmpty(data.user)) {
    errors.user = "user field is required";
  }
  if (Validator.isEmpty(data.user)) {
    errors.rate = "rate field is required";
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = "message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

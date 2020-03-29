import validator from "validator";
import { isEmpty, isRequired } from "./is-empty";

export const validateClinicReviewFields = data => {
  let errors = {};

  data.user = isRequired(data.user);
  data.rate = isRequired(data.clinic);
  data.review = isRequired(data.review);

  if (Validator.isEmpty(data.clinic)) {
    errors.clinic = "clinic field is required";
  }
  if (Validator.isEmpty(data.user)) {
    errors.user = "user field is required";
  }
  
  if (Validator.isEmpty(data.review)) {
    errors.review = "review field is required";
  }
  if (Validator.isEmpty(data.review.username)) {
    errors.review = "username field is required";
  }
  if (Validator.isEmpty(data.review.message)) {
    errors.review = "message field is required";
  }

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

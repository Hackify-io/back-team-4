import validator from "validator";
import { isEmpty, isRequired } from "./is-empty";

export const validatePlaceFields = data => {
  let errors = {};

  data.country = isRequired(data.country);
  data.degree = isRequired(data.degree);
  data.pictureUrl = isRequired(data.pictureUrl);

  if (validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }
  if (validator.isEmpty(data.pictureUrl)) {
    errors.pictureUrl = "Picture Url field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

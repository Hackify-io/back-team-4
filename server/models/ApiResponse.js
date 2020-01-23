import { isEmpty, isRequired } from "../validations/is-empty";

class ApiResponse {
  constructor(props) {
    this.statusCode = props ? props.statusCode : null;
    this.errorMessage = props ? props.errorMessage : null;
    this.result = props ? props.result : null;
    this.fields = props ? props.errors : null;
    this.isSuccess = props ? props.isSuccess : null;
    this.description = props ? props.description : null;
  }

  addValidationError(key, value) {
    if (this.errors === null) this.errors = new Object();
    this.errors[key] = value;
  }

  setResponse(props) {
    if (!isEmpty(props)) {
      if (!isEmpty(props.statusCode)) this.statusCode = props.statusCode;
      if (!isEmpty(props.errorMessage)) this.errorMessage = props.errorMessage;
      if (!isEmpty(props.result)) this.result = props.result;
      if (!isEmpty(props.fields)) this.fields = props.fields;
      if (!isEmpty(props.isSuccess)) this.isSuccess = props.isSuccess;
      if (!isEmpty(props.description)) this.description = props.description;
    }
  }

  async Ok(result) {
    this.setResponse({
      statusCode: 200,
      description: "Success",
      isSuccess: true,
      result
    });
  }

  async NoContent() {
    this.setResponse({
      statusCode: 204,
      description: "Success",
      isSuccess: true
    });
  }

  async NotFound() {
    this.setResponse({
      statusCode: 404,
      errorMessage: "NO_RESOURCES",
      isSuccess: false
    });
  }

  async InternalServerError(err) {
    this.setResponse({
      statusCode: 500,
      errorMessage: "INTERNAL_SERVER_ERROR",
      isSuccess: false,
      description: err
    });
  }

  async ValidationError(errors) {
    this.setResponse({
      statusCode: 422,
      fields: errors,
      errorMessage: "VALIDATION_ERROR",
      isSuccess: false
    });
  }

  async InvalidUrlParameter(urlParameterName) {
    const errors = new Object();
    errors[urlParameterName] = "Invalid Url Parameter";
    await ValidationError(errors);
  }
}

export default ApiResponse;

import ApiResponse from "../models/ApiResponse";

export default class Repository {
  static async getAll(DataModel, filter = {}, populateFields = []) {
    let response = new ApiResponse();
    try {
      let promiseValues = DataModel.find(filter);
      for (const field of populateFields) {
        promiseValues = promiseValues.populate(field);
      }
      let values = await promiseValues;
      response.Ok(values);
      return response;
    } catch (err) {
      response.InternalServerError(err.message);
      return response;
    }
  }

  static async getById(DataModel, id, populateFields = []) {
    let response = new ApiResponse();
    try {
      let promiseValues = DataModel.findById(id);
      for (const field of populateFields) {
        promiseValues = promiseValues.populate(field);
      }
      let values = await promiseValues;
      response.Ok(values);
      return response;
    } catch (err) {
      response.InternalServerError(err.message);
      return response;
    }
  }

  static async create(DataModel, model = {}, validator = null) {
    let response = new ApiResponse();
    if (validator) {
      const { errors, isValid } = validator(model);
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        response.ValidationError(errors);
        return response;
      }
    }
    const newModel = new DataModel(model);
    try {
      let saveResponse = await newModel.save();
      response.Ok(saveResponse);
      return response;
    } catch (err) {
      response.InternalServerError(err.message);
      return response;
    }
  }

  static async update(DataModel, id, model = {}, validator = null) {
    let response = new ApiResponse();
    //Look if model Exist
    let dbModel;
    let dbModelDoc;
    try {
      let getResponse = await this.getById(DataModel, id);
      dbModel = getResponse.result;
      dbModelDoc = dbModel._doc;
      delete dbModelDoc.modifiedUser;
      if (!dbModel) {
        response.NotFound();
        return response;
      }
    } catch (err) {
      response.InternalServerError(err);
      return response;
    }

    const mergedModel = { ...dbModel._doc, ...model };
    if (validator) {
      let { errors, isValid } = validator(mergedModel);
      // Check Validation

      if (!isValid) {
        // If any errors, send 400 with errors object
        response.ValidationError(errors);
        return response;
      }
    }
    let query = { $set: {} };
    for (let key in model) {
      if (dbModel[key] && model[key] && dbModel[key] !== model[key]) {
        query.$set[key] = model[key];
      }
    }

    try {
      await DataModel.updateOne({ _id: id }, query);
      let updatedModel = await DataModel.findById(id);
      response.Ok(updatedModel);
      return response;
    } catch (err) {
      response.InternalServerError(err.message);
      return response;
    }
  }

  static async remove(DataModel, id) {
    let response = new ApiResponse();
    try {
      let getResponse = await this.getById(DataModel, id);
      let dbModel = getResponse.result;
      if (!dbModel) {
        response.NotFound();
        return response;
      }
      await dbModel.remove();
      response.NoContent();
      return response;
    } catch (err) {
      response.InternalServerError(err);
      return response;
    }
  }
}

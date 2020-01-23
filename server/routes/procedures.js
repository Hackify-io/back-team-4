import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Procedure from "../models/Procedure";
import { validateProcedureFields } from "../validations/procedure";

// @route   GET api/procedures
// @desc    Get procedures
// @access  Public
router.get("/", async (req, res) => {
  let response = new ApiResponse();
  try {
    let procedures = await Procedure.find();
    response.Ok(procedures);
    res.status(response.statusCode).json(response);
  } catch (err) {
    response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   GET api/procedures/:id
// @desc    Get procedures
// @access  Public
router.get("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let procedure = await Procedure.findById(req.params.id);
    if (!procedure) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(procedure);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.log(err);
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/procedures
// @desc    Create procedures
// @access  Private
router.post("/", async (req, res) => {
  const response = new ApiResponse();
  const { errors, isValid } = validateProcedureFields(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const newProcedure = new Procedure({
    name: req.body.name,
    createdUser: req.body.createdUser,
    createdDate: new Date()
  });

  try {
    const postResponse = await newProcedure.save();

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

router.put("/:id", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateProcedureFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  //Look if procedure Exist
  let procedure;
  try {
    procedure = await Procedure.findById(req.params.id);
    if (!procedure) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }

  const updatedProcedure = {
    name: req.body.name,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Procedure.findOneAndUpdate(req.params.id, {
      $set: updatedProcedure
    });
    let updatedModel = await Procedure.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/procedures/:id
// @desc    Delete procedure
// @access  private
router.delete("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let procedure = await Procedure.findById(req.params.id);
    if (!procedure) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await procedure.remove();
    await response.NoContent();
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

export default router;

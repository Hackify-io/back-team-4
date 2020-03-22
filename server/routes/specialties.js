import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Specialty from "../models/Specialty";
import { validateSpecialtyFields } from "../validations/specialty";

// @route   GET api/specialties
// @desc    Get specialties
// @access  Public
router.get("/", async (req, res) => {
  let response = new ApiResponse();
  try {
    let specialties = await Specialty.find();
    response.Ok(specialties);
    res.status(response.statusCode).json(response);
  } catch (err) {
    response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   GET api/specialties/:id
// @desc    Get specialties
// @access  Public
router.get("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(specialty);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.log(err);
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/specialties
// @desc    Create specialties
// @access  Private
router.post("/", async (req, res) => {
  const response = new ApiResponse();
  const { errors, isValid } = validateSpecialtyFields(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const newSpecialty = new Specialty({
    name: req.body.name,
    createdUser: req.body.createdUser,
    createdDate: new Date()
  });

  try {
    const postResponse = await newSpecialty.save();

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

router.put("/:id", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateSpecialtyFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  //Look if specialty Exist
  let specialty;
  try {
    specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }

  const updatedSpecialty = {
    name: req.body.name,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Specialty.findOneAndUpdate(req.params.id, {
      $set: updatedSpecialty
    });
    let updatedModel = await Specialty.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/specialties/:id
// @desc    Delete specialty
// @access  private
router.delete("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await specialty.remove();
    await response.NoContent();
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

export default router;

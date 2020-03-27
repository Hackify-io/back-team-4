import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Clinic from "../models/Clinic";
import { validateClinicFields } from "../validations/clinic";

// @route   GET api/clinics?{filters}
// @desc    Get clinics using filter
// @access  Public
router.get("/", async (req, res) => {
  let response = new ApiResponse();
  const { location, specialty } = req.query;

  const filters = {
    ...(specialty ? { specialties: specialty } : {}),
    ...(location ? { location: location } : {})
  };
  try {
    let clinic = await Clinic.find(filters)
      .populate("specialties")
      .populate("location");
    await response.Ok(clinic);
    res.status(response.statusCode).json(response);
  } catch (err) {
    response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   GET api/clinics/:id
// @desc    Get clinics
// @access  Private
router.get("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let clinic = await Clinic.findById(req.params.id)
      .populate("specialties")
      .populate("location");
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(clinic);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/clinics
// @desc    Create clinics
// @access  Private
router.post("/", async (req, res) => {
  const response = new ApiResponse();
  const { errors, isValid } = validateClinicFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const newClinic = new Clinic({
    loginId: req.body.loginId,
    name: req.body.name,
    createdUser: req.body.createdUser,
    location: req.body.location,
    address: req.body.address,
    feedback: [],
    telephone: req.body.telephone,
    specialties: req.body.specialties,
    description: req.body.description,
    imgs: req.body.imgs,
    createdDate: new Date()
  });
  try {
    const postResponse = await newClinic.save();

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   PUT api/clinics
// @desc    Update clinics
// @access  Private
router.put("/:id", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateClinicFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  //Look if clinic Exist
  let clinic;
  try {
    clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }

  const updatedClinic = {
    name: req.body.name,
    location: req.body.location,
    address: req.body.address,
    feedback: req.body.feedback,
    telephone: req.body.telephone,
    specialties: req.body.specialties,
    description: req.body.description,
    imgs: req.body.imgs,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Clinic.findOneAndUpdate(req.params.id, {
      $set: updatedClinic
    });
    let updatedModel = await Clinic.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/clinics/:id
// @desc    Delete clinic
// @access  private
router.delete("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await clinic.remove();
    await response.NoContent();
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.log(err);
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

export default router;

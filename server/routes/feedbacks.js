import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Clinic from "../models/Clinic";
import { validateFeedbackFields } from "../validations/feedback";

// @route   POST api/clinics/:id/feedback
// @desc    Add feedback to clinic
// @access  Private
router.post("/:clinicId/feedbacks/add", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateFeedbackFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }
  let newFeedback = {
    user: req.body.user,
    rate: req.body.rate,
    message: req.body.message
  };
  //Look if clinic Exist
  let clinic;
  try {
    clinic = await Clinic.findById(req.params.clinicId);
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
  clinic.feedbacks.push(newFeedback);
  const postResponse = await clinic.save();
  await response.Ok(postResponse);
  res.status(response.statusCode).json(response);
});

// @route   POST api/clinics/:id/feedback
// @desc    Remove feedback from clinics
// @access  Private
router.post("/:clinicId/feedbacks/remove", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateFeedbackFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }
  let feedback = {
    user: req.body.user,
    rate: req.body.rate,
    message: req.body.message
  };
  //Look if clinic Exist
  let clinic;
  try {
    clinic = await Clinic.findById(req.params.clinicId);
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
  clinic.feedbacks.pull(feedback);
  await clinic.save();
  const postResponse = (clinic = await Clinic.findById(req.params.clinicId));
  await response.Ok(postResponse);
  res.status(response.statusCode).json(response);
});

export default router;

import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Clinic from "../models/Clinic";
import { validateFeedbackFields } from "../validations/feedback";

// @route   POST api/clinics/:id/feedback
// @desc    Add feedback to clinic
// @access  Private
router.post("/:clinicId/feedbacks/", async (req, res) => {
  
  //Get Prerequirments: Clinic by ClinicId
  let getClinicResponse = {};
  //If Clinic is null 
  if(!getClinicResponse.isSuccess){
    res.status(getClinicResponse.statusCode).json(getClinicResponse);
  }
  const clinic = getClinicResponse.result;
  
  //Create the ClinicReview using the ClinicId

  res.status(response.statusCode).json(response);
});

// @route   POST api/clinics/:id/feedback
// @desc    Remove feedback from clinics
// @access  Private
router.delete("/:clinicId/feedbacks/remove", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateFeedbackFields(req.body);

  res.status(response.statusCode).json(response);
});

export default router;

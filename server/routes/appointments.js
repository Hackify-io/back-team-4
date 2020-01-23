import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import { validateAppointmentFields } from "../validations/appointment";
import Appointment from "../models/Appointment";

// @route   POST api/clinics/:id/appointments
// @desc    Create appointment for clinic
// @access  Private
router.post("/", async (req, res) => {
  const response = new ApiResponse();
  const { errors, isValid } = validateAppointmentFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const newAppointment = new Appointment({
    userId: req.body.userId,
    clinicId: req.params.clinicId,
    date: req.body.date,
    status: "Pending",
    createdDate: new Date()
  });
  //TODO.JGuerrero:Check if user and clinic exists before creating the appointment
  try {
    const postResponse = await newAppointment.save();

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

export default router;

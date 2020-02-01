import express from 'express';

const router = express();

import ApiResponse from '../models/ApiResponse';

//import models
import { validateAppointmentFields } from '../validations/appointment';
import Appointment from '../models/Appointment';

// @route   GET api/appointments
// @desc    Get appointments
// @access  Public
router.get('/clinics/:clinicId/appointments', async (req, res) => {
  let response = new ApiResponse();
  let currentClinicId = req.params.clinicId;
  try {
    let appointments = await Appointment.find({ clinicId: currentClinicId });
    response.Ok(appointments);
    res.status(response.statusCode).json(response);
  } catch (err) {
    response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   GET api/appointments/:id
// @desc    Get appointments
// @access  Public
router.get('/appointments/:id', async (req, res) => {
  let response = new ApiResponse();
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(appointment);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/clinics/:id/appointments
// @desc    Create appointment for clinic
// @access  Private
router.post('/clinics/:clinicId/appointments', async (req, res) => {
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
    userName: req.body.userName,
    procedure: req.body.procedure,
    date: req.body.date,
    time: req.body.time,
    status: 'Pending',
    createdUser: req.body.createdUser,
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

// @route   PUT api/clinics/:id/appointments
// @desc    Update appointment for clinic
// @access  Private
router.put('/appointments/:id', async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateAppointmentFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  //Look if appointment Exist
  let appointment;
  try {
    appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
  appointment.userId = req.body.userId;
  appointment.clinicId = req.body.clinicId;
  appointment.date = req.body.date;
  appointment.status = req.body.status;
  appointment.modifiedUser = req.body.modifiedUser;
  appointment.modifiedDate = new Date();
  try {
    let updateResponse = await appointment.save();
    let updatedModel = await Appointment.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/appointments/:id
// @desc    Delete appointment
// @access  private
router.delete('/:id', async (req, res) => {
  let response = new ApiResponse();
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await appointment.remove();
    await response.NoContent();
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});
export default router;

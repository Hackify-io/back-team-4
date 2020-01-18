import express from 'express';

const router = express();

import ApiResponse from '../models/ApiResponse';

//import models
import Clinics from '../models/Clinic';
import { validateClinicFields } from '../validations/clinic';

// @route   GET api/clinics/:id
// @desc    Get clinics
// @access  Private
router.get('/:id', async (req, res) => {
  let response = new ApiResponse();
  try {
    let clinic = await Clinics.findById(req.params.id);
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(clinic);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError();
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/clinics
// @desc    Create clinics
// @access  Private
router.post('/', async (req, res) => {
  const response = new ApiResponse();
  const { errors, isValid } = validateClinicFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const newClinic = new Clinics({
    name: req.body.name,
    createdUser: req.body.createdUser,
    createdDate: new Date()
  });

  try {
    const postResponse = await newClinic.save();

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError();
    res.status(response.statusCode).json(response);
  }
});

export default router;

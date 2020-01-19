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
    //TODO
    //if id is not a valid mongo id the app sends a 500 error
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

router.put('/:id', async (req, res) => {
  let response = new ApiResponse();
  //TODO
  //validations

  //Look if foo Exist
  let clinic;
  try {
    clinic = await Clinics.findById(req.params.id);
    if (!clinic) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }

  const updatedClinic = {
    name: req.body.name,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Clinics.findOneAndUpdate(req.params.id, {
      $set: updatedClinic
    });
    let updatedModel = await Clinics.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

export default router;

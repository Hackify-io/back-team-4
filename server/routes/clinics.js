import express from 'express';

const router = express();

import ApiResponse from '../models/ApiResponse';

//import models
import Clinics from '../models/Clinic';
import { validateClinicFields } from '../validations/clinic';

// @route   GET api/clinics?{filters}
// @desc    Get clinics using filter
// @access  Public
router.get('/', async (req, res) => {
  let response = new ApiResponse();
  try {
    let clinics = await Clinics.find();
    let clinicsFiltered = [];

    //perform filters
    clinics.forEach(c => {
      //filter by location

      if (c.location == req.query.location) {
        //then filter by procedures
        c.procedures.forEach(p => {
          if (p == req.query.procedure) {
            clinicsFiltered.push(c);
          }
        });
      }
    });

    await response.Ok(clinicsFiltered);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.log(err);

    response.InternalServerError();
    res.status(response.statusCode).json(response);
  }
});

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
    location: req.body.location,
    address: req.body.address,
    feedback: req.body.feedback,
    telephone: req.body.telephone,
    procedures: req.body.procedures,
    description: req.body.description,
    imgs: req.body.imgs,
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
    location: req.body.location,
    address: req.body.address,
    feedback: req.body.feedback,
    telephone: req.body.telephone,
    procedures: req.body.procedures,
    description: req.body.description,
    imgs: req.body.imgs,
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

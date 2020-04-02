import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";
import Repository from "./../services/repository";

//import models
import Clinic from "../models/Clinic";
import { validateClinicFields } from "../validations/clinic";

// @route   GET api/clinics?{filters}
// @desc    Get clinics using filter
// @access  Public
router.get("/", async (req, res) => {
  const { location, specialty } = req.query;
  let filter = {
    ...(specialty ? { specialty: specialty } : {}),
    ...(location ? { location: location } : {})
  };
  let populate = ["specialties", "location", "doctors", "rates", "reviews"];
  1;
  let response = await Repository.getAll(Clinic, filter, populate);
  res.status(response.statusCode).json(response);
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
      res.status(response.statusCode).json(response);
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

import validateClinicRateFields from "../validations/clinicrate";
import ClinicRate from "../models/ClinicRate";

// @route   POST api/clinics/:id/rates
// @desc    Add rate to clinic
// @access  Private
router.post("/:clinicId/rates/", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId

  try {
    const { clinicId } = req.params;
    const populate = ["rates"];
    const getClinicResponse = await Repository.getById(
      Clinic,
      clinicId,
      populate
    );

    if (!getClinicResponse) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    //If there is no Clinic we return not found Clinic by the Repo
    // if (!getClinicResponse.isSuccess) {
    //   return res.status(getClinicResponse.statusCode).json(getClinicResponse);
    // }
    const currentClinic = getClinicResponse.result;

    //If Clinic Exist we create the Rate
    const createClinicRateResponse = await Repository.create(
      ClinicRate,
      req.body,
      validateClinicRateFields
    );

    //If the Rate Couldnt Be created we return creation Error
    if (!createClinicRateResponse) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    const currentRate = createClinicRateResponse.result;

    //If everything goes well to this point we update clinic reference

    // console.log(currentRate);

    let currentRates = currentClinic.rates;

    currentRates.push(currentRate._id);

    console.log(currentRates);

    //Updating this way is experimental so we can have an HTTP Response if it does not work use:
    //currentClinic.rates.push(currentRate._id)
    //await currentClinic.save();
    await currentClinic.save();
    await response.Ok();
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.log(err);
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/clinics/:id/rates
// @desc    DELETE rate from clinic
// @access  Private
router.delete("/:clinicId/rates/:rateId", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId, rateId } = req.params;
  const populate = ["rates"];
  const getClinicResponse = await Repository.getById(
    Clinic,
    clinicId,
    populate
  );

  //If there is no Clinic we return not found Clinic by the Repo
  if (!getClinicResponse.isSuccess) {
    return res.status(getClinicResponse.statusCode).json(getClinicResponse);
  }
  const currentClinic = getClinicResponse.result;

  console.log("qhe bergas?");

  //If everything goes well to this point we update clinic reference

  const currentRates = currentClinic.rates.filter(r => r._id == rateId);

  console.log(currentClinic.rates);
  console.log(currentRates);

  //Updating this way is experimental so we can have an HTTP Response if it does not work use:
  //currentClinic.rates.push(currentRate._id)
  //await currentClinic.save();
  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    currentRates,
    validateClinicFields
  );
  return res.status(updateClinicResponse.statusCode).json(updateClinicResponse);
});

export default router;

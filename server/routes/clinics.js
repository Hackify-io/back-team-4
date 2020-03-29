import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";
import Repository from "./../services/repository";

//import models
import Clinic from "../models/Clinic";
import { validateClinicFields } from "../validations/clinic";
import { validateClinicReviewFields } from "../validations/clinicReview"

import ClinicReview from "../models/ClinicReview";

// @route   POST api/clinics/:id/reviews
// @desc    Add review to clinic
// @access  Private
router.post("/:clinicId/reviews/", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId } = this.params;
  const populate = ["reviews"];
  const getClinicResponse = await Repository.getById(Clinic, clinicId, populate);

  //If there is no Clinic we return not found Clinic by the Repo
  if(!getClinicResponse.isSuccess){
    return res.status(getClinicResponse.statusCode).json(getClinicResponse);
  }
  const currentClinic = getClinicResponse.result;

  //If Clinic Exist we create the Review
  const createClinicReviewResponse = await Repository.create(
    ClinicReview,
    req.body,
    validateClinicReviewFields
    );
  //If the Review Couldnt Be created we return creation Error
  if(!createClinicReviewResponse.isSuccess){
    return res.status(createClinicReviewResponse.statusCode).json(createClinicReviewResponse);
  }
  const currentReview =createClinicReviewResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentReviews = currentClinic.reviews;
  currentReviews.push(currentReview._id);
  //Updating this way is experimental so we can have an HTTP Response if it does not work use:
  //currentClinic.reviews.push(currentReview._id)
  //await currentClinic.save();
  const updateClinicResponse = await Repository.update(Clinic, currentClinic._id, currentReviews, validateClinicFields);
  return res.status(updateClinicResponse.statusCode).json(updateClinicResponse);
});

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

export default router;

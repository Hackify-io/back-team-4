import express from "express";

const router = express();

import Repository from "./../services/repository";

//import models
import Clinic from "../models/Clinic";
import { validateClinicFields } from "../validations/clinic";
import { validateClinicReviewFields } from "../validations/clinicreview";

import ClinicReview from "../models/ClinicReview";

// @route   POST api/clinics/:id/reviews
// @desc    Add review to clinic
// @access  Private
router.post("/:clinicId/reviews/", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId } = this.params;
  const populate = ["reviews"];
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

  //If Clinic Exist we create the Review
  const createClinicReviewResponse = await Repository.create(
    ClinicReview,
    req.body,
    validateClinicReviewFields
  );
  //If the Review Couldnt Be created we return creation Error
  if (!createClinicReviewResponse.isSuccesss) {
    return res
      .status(createClinicReviewResponse.statusCode)
      .json(createClinicReviewResponse);
  }
  const currentReview = createClinicReviewResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentReviews = currentClinic.reviews;
  currentReviews.push(currentReview._id);
  //Updating this way is experimental so we can have an HTTP Response if it does not work use:
  //currentClinic.reviews.push(currentReview._id)
  //await currentClinic.save();
  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    currentReviews,
    validateClinicFields
  );
  return res.status(updateClinicResponse.statusCode).json(updateClinicResponse);
});

// @route   DELETE api/clinics/:id/reviews
// @desc    Delete review to clinic
// @access  Private
router.delete("/:clinicId/reviews/", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId } = this.params;
  const populate = ["reviews"];
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

  //If Clinic Exist we create the Review
  const createClinicReviewResponse = await Repository.create(
    ClinicReview,
    req.body,
    validateClinicReviewFields
  );
  //If the Review Couldnt Be created we return creation Error
  if (!createClinicReviewResponse.isSuccesss) {
    return res
      .status(createClinicReviewResponse.statusCode)
      .json(createClinicReviewResponse);
  }
  const currentReview = createClinicReviewResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentReviews = currentClinic.reviews.filter(r => r._id == review._id);
  currentReviews.push(currentReview._id);
  //Updating this way is experimental so we can have an HTTP Response if it does not work use:
  //currentClinic.reviews.push(currentReview._id)
  //await currentClinic.save();
  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    currentReviews,
    validateClinicFields
  );
  return res.status(updateClinicResponse.statusCode).json(updateClinicResponse);
});

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
  const createRequest = await Repository.validateCreateRequest(req.body);
  if (!createRequest.isSuccess) {
    return res.status(createRequest.statusCode).json(createRequest);
  }
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId } = req.params;
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

  const newClinicReview = { ...req.body, clinic: clinicId };

  const createClinicReviewResponse = await Repository.create(
    ClinicReview,
    newClinicReview,
    validateClinicReviewFields
  );

  //If the Review Couldnt Be created we return creation Error
  if (!createClinicReviewResponse.isSuccess) {
    return res
      .status(createClinicReviewResponse.statusCode)
      .json(createClinicReviewResponse);
  }
  const currentReview = createClinicReviewResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentReviews = currentClinic.reviews;
  currentReviews.push(currentReview._id);

  const updateClinic = {
    reviews: currentReviews,
    modifiedUser: req.body.createdUser,
  };

  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    updateClinic,
    validateClinicFields
  );

  //If something wrong happend updating the clinicreview reference return it
  if (!updateClinicResponse.isSuccess) {
    return res
      .status(updateClinicResponse.statusCode)
      .json(updateClinicResponse);
  }

  return res
    .status(createClinicReviewResponse.statusCode)
    .json(createClinicReviewResponse);
});

// @route   DELETE api/clinics/:id/reviews
// @desc    Delete review to clinic
// @access  Private
router.delete("/:clinicId/reviews/:reviewId", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId, reviewId } = req.params;
  const getClinicResponse = await Repository.getById(Clinic, clinicId);

  //If there is no Clinic we return not found Clinic by the Repo
  if (!getClinicResponse.isSuccess) {
    return res.status(getClinicResponse.statusCode).json(getClinicResponse);
  }
  const currentClinic = getClinicResponse.result;

  //If Clinic Exist we create the Review

  const getClinicReviewResponse = await Repository.getById(
    ClinicReview,
    reviewId
  );

  if (getClinicReviewResponse.isSuccess && getClinicReviewResponse === null) {
    return res
      .status(getClinicReviewResponse.statusCode)
      .json(createClinicReviewResponse);
  }

  //If the Review Couldnt Be created we return creation Error

  const deleteClinicReviewResponse = await Repository.remove(
    ClinicReview,
    reviewId
  );

  if (!deleteClinicReviewResponse.isSuccess) {
    return res
      .status(deleteClinicReviewResponse.statusCode)
      .json(deleteClinicReviewResponse);
  }

  //If everything goes well to this point we update clinic reference
  const currentReviews = currentClinic.reviews.filter((r) => r != reviewId);

  const updateClinic = {
    reviews: currentReviews,
    modifiedUser: `Delete ClinicReview: ${reviewId}`,
  };

  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    updateClinic,
    validateClinicFields
  );

  if (!updateClinicResponse.isSuccess) {
    return res
      .status(updateClinicResponse.statusCode)
      .json(updateClinicResponse);
  }
  return res.status(204).json({});
});
export default router;

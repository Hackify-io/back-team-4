import express from "express";

const router = express();

import Repository from "./../services/repository";

//import models
import Clinic from "../models/Clinic";
import { validateClinicFields } from "../validations/clinic";

import { validateClinicRateFields } from "../validations/clinicrate";
import ClinicRate from "../models/ClinicRate";

// @route   POST api/clinics/:id/rates
// @desc    Add rate to clinic
// @access  Private
router.post("/:clinicId/rates/", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId } = this.params;
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

  //If Clinic Exist we create the Rate
  const createClinicRateResponse = await Repository.create(
    ClinicRate,
    req.body,
    validateClinicRateFields
  );
  //If the Rate Couldnt Be created we return creation Error
  if (!createClinicRateResponse.isSuccesss) {
    return res
      .status(createClinicRateResponse.statusCode)
      .json(createClinicRateResponse);
  }
  const currentRate = createClinicRateResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentRates = currentClinic.rates;
  currentRate.push(currentRate._id);
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

// @route   DELETE api/clinics/:id/rates
// @desc    DELETE rate from clinic
// @access  Private
router.delete("/:clinicId/rates/", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId } = this.params;
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

  //If Clinic Exist we create the Rate
  const createClinicRateResponse = await Repository.create(
    ClinicRate,
    req.body,
    validateClinicRateFields
  );
  //If the Rate Couldnt Be created we return creation Error
  if (!createClinicRateResponse.isSuccesss) {
    return res
      .status(createClinicRateResponse.statusCode)
      .json(createClinicRateResponse);
  }
  const currentRate = createClinicRateResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentRates = currentClinic.rates.filter(r => r._id == rates._id);
  currentRates.push(currentRate._id);
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

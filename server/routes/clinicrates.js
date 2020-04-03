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
  const { clinicId } = req.params;
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

  const newClinicRate = { ...req.body, clinicId: clinicId };

  const createClinicRateResponse = await Repository.create(
    ClinicRate,
    newClinicRate,
    validateClinicRateFields
  );

  //If the Rate Couldnt Be created we return creation Error
  if (!createClinicRateResponse.isSuccess) {
    return res
      .status(createClinicRateResponse.statusCode)
      .json(createClinicRateResponse);
  }
  const currentRate = createClinicRateResponse.result;

  //If everything goes well to this point we update clinic reference
  let currentRates = currentClinic.rates;
  currentRates.push(currentRate._id);
  //Updating this way is experimental so we can have an HTTP Response if it does not work use:
  //currentClinic.rates.push(currentRate._id)
  //await currentClinic.save();

  const updateClinic = {
    rates: currentRates,
    modifiedUser: req.body.modifiedUser
  };

  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    updateClinic,
    validateClinicFields
  );

  //console.log(updateClinicResponse);

  return res
    .status(createClinicRateResponse.statusCode)
    .json(createClinicRateResponse);
});

// @route   DELETE api/clinics/:id/rates
// @desc    DELETE rate from clinic
// @access  Private
router.delete("/:clinicId/rates/:rateId", async (req, res) => {
  //Get Prerequirments: Clinic by ClinicId
  const { clinicId, rateId } = req.params;
  const getClinicResponse = await Repository.getById(Clinic, clinicId);

  //If there is no Clinic we return not found Clinic by the Repo
  if (!getClinicResponse.isSuccess) {
    return res.status(getClinicResponse.statusCode).json(getClinicResponse);
  }
  const currentClinic = getClinicResponse.result;

  //If Clinic Exist we create the Rate

  const getClinicRateResponse = await Repository.getById(ClinicRate, rateId);

  if (getClinicRateResponse.isSuccess && getClinicRateResponse === null) {
    return res
      .status(getClinicRateResponse.statusCode)
      .json(createClinicRateResponse);
  }

  //If the Rate Couldnt Be created we return creation Error

  const deleteClinicRateResponse = await Repository.remove(ClinicRate, rateId);

  if (!deleteClinicRateResponse.isSuccess) {
    return res
      .status(deleteClinicRateResponse.statusCode)
      .json(deleteClinicRateResponse);
  }

  //If everything goes well to this point we update clinic reference
  const currentRates = currentClinic.rates.filter(r => r != rateId);

  //console.log(currentRates);

  //Updating this way is experimental so we can have an HTTP Response if it does not work use:
  //currentClinic.rates.push(currentRate._id)
  //await currentClinic.save();

  const updateClinic = {
    rates: currentRates,
    modifiedUser: req.body.modifiedUser
  };

  const updateClinicResponse = await Repository.update(
    Clinic,
    currentClinic._id,
    updateClinic,
    validateClinicFields
  );

  return res.status(204).json({});
});
export default router;

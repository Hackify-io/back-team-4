import express from "express";

const router = express();
import Repository from "./../services/repository";

import ApiResponse from "../models/ApiResponse";

//import models
import Specialty from "../models/Specialty";
import { validateSpecialtyFields } from "../validations/specialty";

// @route   GET api/specialties
// @desc    Get specialties
// @access  Public
router.get("/", async (req, res) => {
  let response = await Repository.getAll(Specialty);

  const page = 1;
  const limit = 2;

  const StartIndex = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(response);

  const resultSpecialties = response.result.slice(StartIndex, endIndex);

  res.status(response.statusCode).json(resultSpecialties);
});

// @route   GET api/specialties/:id
// @desc    Get specialties
// @access  Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(Specialty, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/specialties
// @desc    Create specialties
// @access  Private
router.post("/", async (req, res) => {
  let response = await Repository.create(
    Specialty,
    req.body,
    validateSpecialtyFields
  );
  return res.status(response.statusCode).json(response);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    Specialty,
    id,
    req.body,
    validateSpecialtyFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/specialties/:id
// @desc    Delete specialty
// @access  private
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(Specialty, id);
  return res.status(response.statusCode).json(response);
});

export default router;

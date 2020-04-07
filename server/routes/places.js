import express from "express";
import Repository from "./../services/repository";
const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Place from "../models/Place";
import { validatePlaceFields } from "../validations/place";

// @route   GET api/places
// @desc    Get places
// @access  Public
router.get("/", async (req, res) => {
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 15,
  };
  let response = await Repository.getAll(Place, options);
  res.status(response.statusCode).json(response);
});

// @route   GET api/places/:id
// @desc    Get places
// @access  Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(Place, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/places
// @desc    Create places
// @access  Private
router.post("/", async (req, res) => {
  let response = await Repository.create(Place, req.body, validatePlaceFields);
  return res.status(response.statusCode).json(response);
});

// @route   PUT api/places/id
// @desc    Update Place
// @access  Public
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    Place,
    id,
    req.body,
    validatePlaceFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/places/:id
// @desc    Delete place
// @access  private
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(Place, id);
  return res.status(response.statusCode).json(response);
});

export default router;

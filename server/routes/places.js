import express from "express";

const router = express();

import ApiResponse from "../models/ApiResponse";

//import models
import Place from "../models/Place";
import { validatePlaceFields } from "../validations/place";

// @route   GET api/places
// @desc    Get places
// @access  Public
router.get("/", async (req, res) => {
  let response = new ApiResponse();
  try {
    let places = await Place.find();
    response.Ok(places);
    res.status(response.statusCode).json(response);
  } catch (err) {
    response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   GET api/places/:id
// @desc    Get places
// @access  Public
router.get("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let place = await Place.findById(req.params.id);
    if (!place) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(place);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/places
// @desc    Create places
// @access  Private
router.post("/", async (req, res) => {
  const response = new ApiResponse();
  const { errors, isValid } = validatePlaceFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const newPlace = new Place({
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    createdUser: req.body.createdUser,
    createdDate: new Date()
  });

  try {
    const postResponse = await newPlace.save();

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

router.put("/:id", async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validatePlaceFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  //Look if place Exist
  let place;
  try {
    place = await Place.findById(req.params.id);
    if (!place) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }

  const updatedPlace = {
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Place.findOneAndUpdate(req.params.id, {
      $set: updatedPlace
    });
    let updatedModel = await Place.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

// @route   DELETE api/places/:id
// @desc    Delete place
// @access  private
router.delete("/:id", async (req, res) => {
  let response = new ApiResponse();
  try {
    let place = await Place.findById(req.params.id);
    if (!place) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
    await place.remove();
    await response.NoContent();
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err.message);
    res.status(response.statusCode).json(response);
  }
});

export default router;

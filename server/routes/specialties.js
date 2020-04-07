import express from "express";
const router = express();
import Repository from "./../services/repository";
import ApiResponse from "../models/ApiResponse";

//import models
import Specialty from "../models/Specialty";
import { validateSpecialtyFields } from "../validations/specialty";

function paginatedResults(model) {
  return async (req, res) => {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 2,
      };
      const result = await model.paginate({}, options);
      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  };
}

// @route   GET api/specialties
// @desc    Get specialties
// @access  Public
router.get("/", paginatedResults(Specialty), (req, res) => {
  res.json(res.paginatedResults);
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

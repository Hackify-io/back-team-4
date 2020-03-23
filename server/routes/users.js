import express from "express";

const router = express();
import Repository from "./../services/repository";

import ApiResponse from "../models/ApiResponse";

//import models
import User from "../models/User";
import { validateUserFields } from "../validations/user";

// @route   GET api/users
// @desc    Get Users
// @access  Public
router.get("/", async (req, res) => {
  let response = await Repository.getAll(User);
  res.status(response.statusCode).json(response);
});

// @route   GET api/users/:id
// @desc    Get User by id
// @access  Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(User, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/users
// @desc    Create User
// @access  Private
router.post("/", async (req, res) => {
  let response = await Repository.create(User, req.body, validateUserFields);
  return res.status(response.statusCode).json(response);
});

// @route   PUT api/users/:id
// @desc    Update User by id
// @access  Public
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    User,
    id,
    req.body,
    validateUserFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/users/:id
// @desc    Delete User by id
// @access  Public
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(User, id);
  return res.status(response.statusCode).json(response);
});

export default router;

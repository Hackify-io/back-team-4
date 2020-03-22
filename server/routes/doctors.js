import express from 'express';
import passport from 'passport';
import Repository from './../services/repository';
const router = express();

// Doctor model
import Model from './../models/Doctor';
// DoctorChild model

//Validations on Doctor
import { validateDoctorFields as validateModelFields } from './../validations/doctor';

// @route   GET api/doctors
// @desc    Get doctors
// @access  Public
router.get('/', async (req, res) => {
  let response = await Repository.getAll(Model);
  res.status(response.statusCode).json(response);
});

// @route   GET api/doctors/:id
// @desc    Get doctors by id
// @access  Public
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(Model, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/doctors
// @desc    Create post
// @access  Public
router.post('/', async (req, res) => {
  let response = await Repository.create(Model, req.body, validateModelFields);
  return res.status(response.statusCode).json(response);
});

// @route   PUT api/doctors/id
// @desc    Update doctors
// @access  Public
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    Model,
    id,
    req.body,
    validateModelFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/doctor/:id
// @desc    Delete doctor
// @access  Public
router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(Model, id);
  return res.status(response.statusCode).json(response);
});

export default router;

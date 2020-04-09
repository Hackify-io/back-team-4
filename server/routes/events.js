import express from 'express';
import Repository from './../services/repository';
const router = express();

// Event model
import Event from './../models/Event';

//Validations on Event
import { validateEventFields } from './../validations/event';

// @route   GET api/events
// @desc    Get events
// @access  Public
router.get('/', async (req, res) => {
  let response = await Repository.getAll(Event, null, null, req.query);
  res.status(response.statusCode).json(response);
});

// @route   GET api/events/:id
// @desc    Get events by id
// @access  Public
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(Event, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/events
// @desc    Create post
// @access  Public
router.post('/', async (req, res) => {
  let response = await Repository.create(Event, req.body, validateEventFields);
  return res.status(response.statusCode).json(response);
});

// @route   PUT api/events/id
// @desc    Update events
// @access  Public
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    Event,
    id,
    req.body,
    validateEventFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/event/:id
// @desc    Delete event
// @access  Public
router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(Event, id);
  return res.status(response.statusCode).json(response);
});

export default router;
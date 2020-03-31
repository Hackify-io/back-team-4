import express from 'express';
import Repository from './../services/repository';
const router = express();

// Blog model
import Blog from './../models/Blog';

//Validations on Blog
import { validateBlogFields } from './../validations/blog';

// @route   GET api/blogs
// @desc    Get blogs
// @access  Public
router.get('/', async (req, res) => {
  let response = await Repository.getAll(Blog);
  res.status(response.statusCode).json(response);
});

// @route   GET api/blogs/:id
// @desc    Get blogs by id
// @access  Public
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Repository.getById(Blog, id);
  res.status(response.statusCode).json(response);
});

// @route   POST api/blogs
// @desc    Create post
// @access  Public
router.post('/', async (req, res) => {
  let response = await Repository.create(Blog, req.body, validateBlogFields);
  return res.status(response.statusCode).json(response);
});

// @route   PUT api/blogs/id
// @desc    Update blogs
// @access  Public
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Repository.update(
    Blog,
    id,
    req.body,
    validateBlogFields
  );
  return res.status(response.statusCode).json(response);
});

// @route   DELETE api/blog/:id
// @desc    Delete blog
// @access  Public
router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  let response = await Repository.remove(Blog, id);
  return res.status(response.statusCode).json(response);
});

export default router;
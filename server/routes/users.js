import express from 'express';

const router = express();

import ApiResponse from '../models/ApiResponse';

//import models
import Users from '../models/User';
//import validation file

// @route   GET api/users/:id
// @desc    Get users
// @access  Private
router.get('/:id', async (req, res) => {
  let response = new ApiResponse();
  try {
    let user = await Users.findById(req.params.id);
    if (!user) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }

    await response.Ok(user);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError();
    res.status(response.statusCode).json(response);
  }
});

// @route   POST api/users
// @desc    Create users
// @access  Private
router.post('/', async (req, res) => {
  const response = new ApiResponse();
  //validations

  const newUser = new Users({
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    createdUser: req.body.createdUser,
    createdDate: new Date()
  });

  try {
    const postResponse = await newUser.save();
    console.log(postResponse);

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.log(err);
    await response.InternalServerError();
    res.status(response.statusCode).json(response);
  }
});

export default router;
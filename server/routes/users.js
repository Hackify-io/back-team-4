import express from 'express';

const router = express();

import ApiResponse from '../models/ApiResponse';

//import models
import Users from '../models/User';
import { validateUserFields } from '../validations/user';

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
  const { errors, isValid } = validateUserFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

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

    await response.Ok(postResponse);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError();
    res.status(response.statusCode).json(response);
  }
});

router.put('/:id', async (req, res) => {
  let response = new ApiResponse();
  //TODO
  //validations

  //Look if foo Exist
  let user;
  try {
    user = await Users.findById(req.params.id);
    if (!user) {
      await response.NotFound();
      return res.status(response.statusCode).json(response);
    }
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }

  const updatedUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    modifiedUser: req.body.modifiedUser,
    modifiedDate: new Date()
  };

  try {
    let updateResponse = await Users.findOneAndUpdate(req.params.id, {
      $set: updatedUser
    });
    let updatedModel = await Users.findById(updateResponse._id);
    await response.Ok(updatedModel);
    res.status(response.statusCode).json(response);
  } catch (err) {
    await response.InternalServerError(err);
    res.status(response.statusCode).json(response);
  }
});

export default router;

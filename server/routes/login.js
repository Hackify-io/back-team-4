import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { keys } from './../config/keys';
import passport from 'passport';
const router = express.Router();

//Load Input Validation
//TODO
//validate register inputs
import { validateLoginInput } from './../validations/login';
//Load Models
import Login from '../models/Login';
import ApiResponse from '../models/ApiResponse';

//import constants
import { roles } from '../constants/constants';

// @route   POST api/logins/clinics/register
// @desc    Register new Login
// @access  Public
router.post('/clinics/register', async (req, res) => {
  let response = new ApiResponse();
  const register = req.body;
  //TODO
  //body validations

  let getLoginRequest = await Login.findOne({ email: register.email });
  //clinic login already exists
  if (getLoginRequest) {
    errors.email = `Email ${getLoginRequest.email} is already registered`;
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  let newLogin = new Login({
    email: register.email,
    password: register.password,
    role: roles.clinic
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      response.InternalServerError(err).then(() => {
        return res.status(response.statusCode).json(response);
      });
    }

    bcrypt.hash(newLogin.password, salt, (err, hash) => {
      if (err) throw err;
      newLogin.password = hash;
      let loginResult = newLogin.save().then(() => {
        response.Ok(loginResult).then(() => {
          return res.status(response.statusCode).json(response);
        });
      });
    });
  });
});

// @route   POST api/logins/users/register
// @desc    Register new Login
// @access  Public
router.post('/users/register', async (req, res) => {
  let response = new ApiResponse();
  const register = req.body;
  //TODO
  //validations

  let getLoginRequest = await Login.findOne({ email: register.email });
  //clinic login already exists
  if (getLoginRequest) {
    //Temporal declaration
    let errors = {};
    errors.email = `Email ${getLoginRequest.email} is already registered`;
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  let newLogin = new Login({
    email: register.email,
    password: register.password,
    role: roles.member
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      response.InternalServerError(err).then(() => {
        return res.status(response.statusCode).json(response);
      });
    }

    bcrypt.hash(newLogin.password, salt, (err, hash) => {
      if (err) throw err;
      newLogin.password = hash;
      let loginResult = newLogin.save().then(() => {
        response.Ok(loginResult).then(() => {
          return res.status(response.statusCode).json(response);
        });
      });
    });
  });
});

// @route   POST api/logins/clinic
// @desc    Login user of type clinic: Returning a JWT
// @access  Public
router.post('/clinics', async (req, res) => {
  let response = new ApiResponse();

  const loginRequest = req.body;
  const { errors, isValid } = validateLoginInput(loginRequest);

  //Check Model Validation Errors
  if (!isValid) {
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  //Look if Login exists
  let getLoginResponse = await Login.findOne({
    email: loginRequest.email
  });
  if (!getLoginResponse) {
    await response.NotFound();
    return res.status(response.statusCode).json(response);
  }

  //If login exist encrypt password and validate model
  const login = getLoginResponse;
  const isMatch = await bcrypt.compare(loginRequest.password, login.password);
  if (isMatch) {
    //Sign the Token
    const payload = {
      id: login.coorelationId,
      email: login.email
    };

    jwt.sign(
      payload,
      keys.authSecret,
      {
        expiresIn: 3600,
        audience: 'All',
        issuer: 'medtravel'
      },
      (err, token) => {
        if (err) {
          response.InternalServerError(err);
          return res.status(response.statusCode).json(response);
        }
        response.Ok(token);
        res.status(response.statusCode).json(response);
      }
    );
  }
});

// @route   POST api/logins/users
// @desc    Login user: Returning a JWT
// @access  Public
router.post('/users', async (req, res) => {
  let response = new ApiResponse();

  const loginRequest = req.body;
  //TODO
  // const { errors, isValid } = validateLoginInput(loginRequest);

  //Check Model Validation Errors
  // if (!isValid) {
  //   await response.ValidationError(errors);
  //   return res.status(response.statusCode).json(response);
  // }

  //Look if Login exists
  let getLoginResponse = await Login.findOne({
    email: loginRequest.email
  });
  if (!getLoginResponse) {
    await response.NotFound();
    return res.status(response.statusCode).json(response);
  }

  //If login exist encrypt password and validate model
  const login = getLoginResponse;
  const isMatch = await bcrypt.compare(loginRequest.password, login.password);
  if (isMatch) {
    //Sign the Token
    const payload = {
      id: login.coorelationId,
      email: login.email
    };

    jwt.sign(
      payload,
      keys.authSecret,
      {
        expiresIn: 3600,
        audience: 'All',
        issuer: 'medtravel'
      },
      (err, token) => {
        if (err) {
          response.InternalServerError(err);
          return res.status(response.statusCode).json(response);
        }
        response.Ok(token);
        res.status(response.statusCode).json(response);
      }
    );
  }
});

export default router;

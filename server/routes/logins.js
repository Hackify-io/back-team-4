import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { keys } from '../config/keys';
import Repository from './../services/repository';
import passport from 'passport';
const router = express.Router();

//Load Input Validation
//TODO
//validate register inputs
import {
  validateLoginFields,
  validateRegisterFields,
} from '../validations/login';

//Load Models
import Login from '../models/Login';
import User from '../models/User';
import Clinic from '../models/Clinic';
import ApiResponse from '../models/ApiResponse';

//import constants
import { roles } from '../constants/constants';

// @route   POST api/logins/clinics/register
// @desc    Register new Login
// @access  Public
router.post('/clinics/register', async (req, res) => {
  let response = new ApiResponse();

  const { errors, isValid } = validateRegisterFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const register = req.body;

  let getLoginResponse = await Repository.getAll(Login, {
    email: register.email,
    role: roles.clinic,
  });

  //clinic login already exists
  if (getLoginResponse.isSuccess && getLoginResponse.result) {
    //Temporal declaration
    let errors = {};
    errors.email = `Email ${getLoginResponse.email} is already registered`;
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  let newLogin = new Login({
    email: register.email,
    password: register.password,
    role: roles.clinic,
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
      Repository.create(Login, newLogin, validateLoginFields).then(
        (createLoginResponse) => {
          return res
            .status(createLoginResponse.statusCode)
            .json(createLoginResponse);
        }
      );
    });
  });
});

// @route   POST api/logins/users/register
// @desc    Register new Login
// @access  Public
router.post('/users/register', async (req, res) => {
  let response = new ApiResponse();

  const { errors, isValid } = validateLoginFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const register = req.body;

  let getLoginResponse = await Repository.getAll(Login, {
    email: register.email,
    role: roles.member,
  });

  //user login already exists
  if (getLoginResponse.isSuccess && getLoginResponse.result) {
    //Temporal declaration
    let errors = {};
    errors.email = `Email ${getLoginResponse.email} is already registered`;
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  let newLogin = new Login({
    email: register.email,
    password: register.password,
    role: roles.member,
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
      Repository.create(Login, newLogin, validateLoginFields).then(
        (createLoginResponse) => {
          return res
            .status(createLoginResponse.statusCode)
            .json(createLoginResponse);
        }
      );
    });
  });
});

// @route   POST api/logins/clinic
// @desc    Login user of type clinic: Returning a JWT
// @access  Public
router.post('/clinics', async (req, res) => {
  let response = new ApiResponse();
  const { errors, isValid } = validateLoginFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const loginRequest = req.body;

  let getLoginResponse = await Repository.getAll(Login, {
    email: loginRequest.email,
    role: roles.clinic,
  });

  //Check if Login Exists
  if (getLoginResponse.isSuccess && !getLoginResponse.result) {
    await getLoginResponse.NotFound();
    return res.status(getLoginResponse.statusCode).json(getLoginResponse);
  }

  //If login exist encrypt password and validate model
  const login = getLoginResponse.result[0];
  const getClinicResponse = await Repository.getAll(Clinic, {
    loginId: login._id,
  });
  const clinic = getClinicResponse.result;
  const isMatch = await bcrypt.compare(loginRequest.password, login.password);
  if (isMatch) {
    //Sign the Token
    const payload = {
      id: login._id,
      clinicId: clinic ? clinic[0]._id : null,
      email: login.email,
      role: roles.clinic,
    };
    jwt.sign(
      payload,
      keys.authSecret,
      {
        expiresIn: 3600,
        audience: 'All',
        issuer: 'medtravel',
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
  const { errors, isValid } = validateLoginFields(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    await response.ValidationError(errors);

    return res.status(response.statusCode).json(response);
  }

  const loginRequest = req.body;

  let getLoginResponse = await Repository.getAll(Login, {
    email: loginRequest.email,
    role: roles.member,
  });
  //Check if Login Exists
  if (getLoginResponse.isSuccess && !getLoginResponse.result) {
    await getLoginResponse.NotFound();
    return res.status(getLoginResponse.statusCode).json(getLoginResponse);
  }

  //If login exist encrypt password and validate model
  const login = getLoginResponse.result[0];
  const getUserResponse = await Repository.getAll(User, { loginId: login._id });
  const user = getUserResponse.result[0];
  const isMatch = await bcrypt.compare(loginRequest.password, login.password);
  if (isMatch) {
    //Sign the Token
    const payload = {
      id: login._id,
      userData: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        avatar: user.avatar,
      },
      email: login.email,
      role: roles.member,
    };
    jwt.sign(
      payload,
      keys.authSecret,
      {
        expiresIn: 3600,
        audience: 'All',
        issuer: 'medtravel',
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

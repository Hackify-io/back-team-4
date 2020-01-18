import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { keys } from './../config/keys';
import passport from 'passport';
const router = express.Router();

//Load Input Validation
import { validateRegisterInput } from './../validations/register';
import { validateLoginInput } from './../validations/login';
//Load Models
import Login from '../models/Login';
import ApiResponse from '../models/ApiResponse';

// @route   GET API/logins/register
// @desc    Register new Login
// @access  Public
router.post('/register', async (req, res) => {
  let response = new ApiResponse();
  const register = req.body;
  const { errors, isValid } = validateRegisterInput(register);

  //Check Model Validation Errors
  if (!isValid) {
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  let getLoginRequest = await Login.findOne({ username: register.username });
  if (getLoginRequest) {
    errors.username = `Username ${getLoginRequest.username} already exist`;
    await response.ValidationError(errors);
    return res.status(response.statusCode).json(response);
  }

  let newLogin = new Login({
    username: register.username,
    email: register.email,
    password: register.password
    // role = register.role //get user role from constants file
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

// @route   GET API/users/login
// @desc    Login user: Returning a JWT
// @access  Public
router.post('/login', async (req, res) => {
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
    username: loginRequest.username
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
      email: login.email,
      username: login.username
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

// @route   GET API/users/current
// @desc    Register user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.username,
      email: req.user.email,
      role: req.user.role
    });
  }
);

export default router;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _keys = require('../config/keys');

var _repository = require('./../services/repository');

var _repository2 = _interopRequireDefault(_repository);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _login = require('../validations/login');

var _Login = require('../models/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Clinic = require('../models/Clinic');

var _Clinic2 = _interopRequireDefault(_Clinic);

var _ApiResponse = require('../models/ApiResponse');

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _constants = require('../constants/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

//Load Input Validation
//TODO
//validate register inputs


//Load Models


//import constants


// @route   POST api/logins/clinics/register
// @desc    Register new Login
// @access  Public
router.post('/clinics/register', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var response, _validateRegisterFiel, errors, isValid, register, getLoginResponse, _errors, newLogin;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateRegisterFiel = (0, _login.validateRegisterFields)(req.body), errors = _validateRegisterFiel.errors, isValid = _validateRegisterFiel.isValid;

            // Check Validation

            if (isValid) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context.abrupt('return', res.status(response.statusCode).json(response));

          case 6:
            register = req.body;
            _context.next = 9;
            return _repository2.default.getAll(_Login2.default, { email: register.email, role: _constants.roles.clinic });

          case 9:
            getLoginResponse = _context.sent;

            if (!(getLoginResponse.isSuccess && getLoginResponse.result)) {
              _context.next = 16;
              break;
            }

            //Temporal declaration
            _errors = {};

            _errors.email = 'Email ' + getLoginResponse.email + ' is already registered';
            _context.next = 15;
            return response.ValidationError(_errors);

          case 15:
            return _context.abrupt('return', res.status(response.statusCode).json(response));

          case 16:
            newLogin = new _Login2.default({
              email: register.email,
              password: register.password,
              role: _constants.roles.clinic
            });


            _bcryptjs2.default.genSalt(10, function (err, salt) {
              if (err) {
                response.InternalServerError(err).then(function () {
                  return res.status(response.statusCode).json(response);
                });
              }

              _bcryptjs2.default.hash(newLogin.password, salt, function (err, hash) {
                if (err) throw err;
                newLogin.password = hash;
                _repository2.default.create(_Login2.default, newLogin, _login.validateLoginFields).then(function (createLoginResponse) {
                  return res.status(createLoginResponse.statusCode).json(createLoginResponse);
                });
              });
            });

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// @route   POST api/logins/users/register
// @desc    Register new Login
// @access  Public
router.post('/users/register', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var response, _validateLoginFields, errors, isValid, register, getLoginResponse, _errors2, newLogin;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateLoginFields = (0, _login.validateLoginFields)(req.body), errors = _validateLoginFields.errors, isValid = _validateLoginFields.isValid;

            // Check Validation

            if (isValid) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context2.abrupt('return', res.status(response.statusCode).json(response));

          case 6:
            register = req.body;
            _context2.next = 9;
            return _repository2.default.getAll(_Login2.default, { email: register.email, role: _constants.roles.member });

          case 9:
            getLoginResponse = _context2.sent;

            if (!(getLoginResponse.isSuccess && getLoginResponse.result)) {
              _context2.next = 16;
              break;
            }

            //Temporal declaration
            _errors2 = {};

            _errors2.email = 'Email ' + getLoginResponse.email + ' is already registered';
            _context2.next = 15;
            return response.ValidationError(_errors2);

          case 15:
            return _context2.abrupt('return', res.status(response.statusCode).json(response));

          case 16:
            newLogin = new _Login2.default({
              email: register.email,
              password: register.password,
              role: _constants.roles.member
            });


            _bcryptjs2.default.genSalt(10, function (err, salt) {
              if (err) {
                response.InternalServerError(err).then(function () {
                  return res.status(response.statusCode).json(response);
                });
              }

              _bcryptjs2.default.hash(newLogin.password, salt, function (err, hash) {
                if (err) throw err;
                newLogin.password = hash;
                _repository2.default.create(_Login2.default, newLogin, _login.validateLoginFields).then(function (createLoginResponse) {
                  return res.status(createLoginResponse.statusCode).json(createLoginResponse);
                });
              });
            });

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// @route   POST api/logins/clinic
// @desc    Login user of type clinic: Returning a JWT
// @access  Public
router.post('/clinics', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var response, _validateLoginFields2, errors, isValid, loginRequest, getLoginResponse, login, getClinicResponse, clinic, isMatch, payload;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateLoginFields2 = (0, _login.validateLoginFields)(req.body), errors = _validateLoginFields2.errors, isValid = _validateLoginFields2.isValid;

            // Check Validation

            if (isValid) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context3.abrupt('return', res.status(response.statusCode).json(response));

          case 6:
            loginRequest = req.body;
            _context3.next = 9;
            return _repository2.default.getAll(_Login2.default, { email: loginRequest.email, role: _constants.roles.clinic });

          case 9:
            getLoginResponse = _context3.sent;

            if (!(getLoginResponse.isSuccess && !getLoginResponse.result)) {
              _context3.next = 14;
              break;
            }

            _context3.next = 13;
            return getLoginResponse.NotFound();

          case 13:
            return _context3.abrupt('return', res.status(getLoginResponse.statusCode).json(getLoginResponse));

          case 14:

            //If login exist encrypt password and validate model
            login = getLoginResponse.result[0];
            _context3.next = 17;
            return _repository2.default.getAll(_Clinic2.default, { loginId: login._id });

          case 17:
            getClinicResponse = _context3.sent;
            clinic = getClinicResponse.result;
            _context3.next = 21;
            return _bcryptjs2.default.compare(loginRequest.password, login.password);

          case 21:
            isMatch = _context3.sent;

            if (isMatch) {
              //Sign the Token
              payload = {
                id: login._id,
                clinicId: clinic ? clinic[0]._id : null,
                email: login.email,
                role: _constants.roles.clinic
              };

              console.log(payload);
              _jsonwebtoken2.default.sign(payload, _keys.keys.authSecret, {
                expiresIn: 3600,
                audience: 'All',
                issuer: 'medtravel'
              }, function (err, token) {
                if (err) {
                  response.InternalServerError(err);
                  return res.status(response.statusCode).json(response);
                }
                response.Ok(token);
                res.status(response.statusCode).json(response);
              });
            }

          case 23:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// @route   POST api/logins/users
// @desc    Login user: Returning a JWT
// @access  Public
router.post('/users', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var response, _validateLoginFields3, errors, isValid, loginRequest, getLoginResponse, login, isMatch, payload;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateLoginFields3 = (0, _login.validateLoginFields)(req.body), errors = _validateLoginFields3.errors, isValid = _validateLoginFields3.isValid;

            // Check Validation

            if (isValid) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context4.abrupt('return', res.status(response.statusCode).json(response));

          case 6:
            loginRequest = req.body;
            _context4.next = 9;
            return _repository2.default.getAll(_Login2.default, { email: loginRequest.email, role: _constants.roles.member });

          case 9:
            getLoginResponse = _context4.sent;

            if (!(getLoginResponse.isSuccess && !getLoginResponse.result)) {
              _context4.next = 14;
              break;
            }

            _context4.next = 13;
            return getLoginResponse.NotFound();

          case 13:
            return _context4.abrupt('return', res.status(getLoginResponse.statusCode).json(getLoginResponse));

          case 14:

            //If login exist encrypt password and validate model
            login = getLoginResponse.result[0];
            _context4.next = 17;
            return _bcryptjs2.default.compare(loginRequest.password, login.password);

          case 17:
            isMatch = _context4.sent;

            if (isMatch) {
              //Sign the Token
              payload = {
                id: login._id,
                email: login.email,
                role: _constants.roles.member
              };


              _jsonwebtoken2.default.sign(payload, _keys.keys.authSecret, {
                expiresIn: 3600,
                audience: 'All',
                issuer: 'medtravel'
              }, function (err, token) {
                if (err) {
                  response.InternalServerError(err);
                  return res.status(response.statusCode).json(response);
                }
                response.Ok(token);
                res.status(response.statusCode).json(response);
              });
            }

          case 19:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=logins.js.map
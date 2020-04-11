'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ApiResponse = require('../models/ApiResponse');

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _user = require('../validations/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express2.default)();

//import models


// @route   GET api/users/:id
// @desc    Get users
// @access  Private
router.get('/:id', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var response, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = new _ApiResponse2.default();
            _context.prev = 1;
            _context.next = 4;
            return _User2.default.findById(req.params.id);

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return response.NotFound();

          case 8:
            return _context.abrupt('return', res.status(response.statusCode).json(response));

          case 9:
            _context.next = 11;
            return response.Ok(user);

          case 11:
            res.status(response.statusCode).json(response);
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](1);
            _context.next = 18;
            return response.InternalServerError();

          case 18:
            res.status(response.statusCode).json(response);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 14]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// @route   POST api/users
// @desc    Create users
// @access  Private
router.post('/', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var response, _validateUserFields, errors, isValid, newUser, postResponse;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateUserFields = (0, _user.validateUserFields)(req.body), errors = _validateUserFields.errors, isValid = _validateUserFields.isValid;

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
            newUser = new _User2.default({
              loginId: req.body.loginId,
              name: req.body.name,
              lastname: req.body.lastname,
              age: req.body.age,
              gender: req.body.gender,
              createdUser: req.body.createdUser,
              createdDate: new Date()
            });
            _context2.prev = 7;
            _context2.next = 10;
            return newUser.save();

          case 10:
            postResponse = _context2.sent;
            _context2.next = 13;
            return response.Ok(postResponse);

          case 13:
            res.status(response.statusCode).json(response);
            _context2.next = 21;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](7);
            _context2.next = 20;
            return response.InternalServerError();

          case 20:
            res.status(response.statusCode).json(response);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[7, 16]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.put('/:id', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var response, user, updatedUser, updateResponse, updatedModel;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            response = new _ApiResponse2.default();
            //TODO
            //validations

            //Look if user Exist

            user = void 0;
            _context3.prev = 2;
            _context3.next = 5;
            return _User2.default.findById(req.params.id);

          case 5:
            user = _context3.sent;

            if (user) {
              _context3.next = 10;
              break;
            }

            _context3.next = 9;
            return response.NotFound();

          case 9:
            return _context3.abrupt('return', res.status(response.statusCode).json(response));

          case 10:
            _context3.next = 17;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](2);
            _context3.next = 16;
            return response.InternalServerError(_context3.t0);

          case 16:
            res.status(response.statusCode).json(response);

          case 17:
            updatedUser = {
              name: req.body.name,
              lastname: req.body.lastname,
              age: req.body.age,
              gender: req.body.gender,
              modifiedUser: req.body.modifiedUser,
              modifiedDate: new Date()
            };
            _context3.prev = 18;
            _context3.next = 21;
            return _User2.default.findOneAndUpdate(req.params.id, {
              $set: updatedUser
            });

          case 21:
            updateResponse = _context3.sent;
            _context3.next = 24;
            return _User2.default.findById(updateResponse._id);

          case 24:
            updatedModel = _context3.sent;
            _context3.next = 27;
            return response.Ok(updatedModel);

          case 27:
            res.status(response.statusCode).json(response);
            _context3.next = 35;
            break;

          case 30:
            _context3.prev = 30;
            _context3.t1 = _context3['catch'](18);
            _context3.next = 34;
            return response.InternalServerError(_context3.t1);

          case 34:
            res.status(response.statusCode).json(response);

          case 35:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 12], [18, 30]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=users.js.map
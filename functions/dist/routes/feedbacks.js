"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ApiResponse = require("../models/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _Clinic = require("../models/Clinic");

var _Clinic2 = _interopRequireDefault(_Clinic);

var _feedback = require("../validations/feedback");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express2.default)();

//import models


// @route   POST api/clinics/:id/feedback
// @desc    Add feedback to clinic
// @access  Private
router.post("/:clinicId/feedbacks/add", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var response, _validateFeedbackFiel, errors, isValid, newFeedback, clinic, postResponse;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateFeedbackFiel = (0, _feedback.validateFeedbackFields)(req.body), errors = _validateFeedbackFiel.errors, isValid = _validateFeedbackFiel.isValid;

            // Check Validation

            if (isValid) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context.abrupt("return", res.status(response.statusCode).json(response));

          case 6:
            newFeedback = {
              user: req.body.user,
              rate: req.body.rate,
              message: req.body.message
            };
            //Look if clinic Exist

            clinic = void 0;
            _context.prev = 8;
            _context.next = 11;
            return _Clinic2.default.findById(req.params.clinicId);

          case 11:
            clinic = _context.sent;

            if (clinic) {
              _context.next = 16;
              break;
            }

            _context.next = 15;
            return response.NotFound();

          case 15:
            return _context.abrupt("return", res.status(response.statusCode).json(response));

          case 16:
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](8);
            _context.next = 22;
            return response.InternalServerError(_context.t0.message);

          case 22:
            res.status(response.statusCode).json(response);

          case 23:
            clinic.feedbacks.push(newFeedback);
            _context.next = 26;
            return clinic.save();

          case 26:
            postResponse = _context.sent;
            _context.next = 29;
            return response.Ok(postResponse);

          case 29:
            res.status(response.statusCode).json(response);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 18]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// @route   POST api/clinics/:id/feedback
// @desc    Remove feedback from clinics
// @access  Private
router.post("/:clinicId/feedbacks/remove", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var response, _validateFeedbackFiel2, errors, isValid, feedback, clinic, postResponse;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateFeedbackFiel2 = (0, _feedback.validateFeedbackFields)(req.body), errors = _validateFeedbackFiel2.errors, isValid = _validateFeedbackFiel2.isValid;

            // Check Validation

            if (isValid) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context2.abrupt("return", res.status(response.statusCode).json(response));

          case 6:
            feedback = {
              user: req.body.user,
              rate: req.body.rate,
              message: req.body.message
            };
            //Look if clinic Exist

            clinic = void 0;
            _context2.prev = 8;
            _context2.next = 11;
            return _Clinic2.default.findById(req.params.clinicId);

          case 11:
            clinic = _context2.sent;

            if (clinic) {
              _context2.next = 16;
              break;
            }

            _context2.next = 15;
            return response.NotFound();

          case 15:
            return _context2.abrupt("return", res.status(response.statusCode).json(response));

          case 16:
            _context2.next = 23;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](8);
            _context2.next = 22;
            return response.InternalServerError(_context2.t0.message);

          case 22:
            res.status(response.statusCode).json(response);

          case 23:
            clinic.feedbacks.pull(feedback);
            _context2.next = 26;
            return clinic.save();

          case 26:
            _context2.next = 28;
            return _Clinic2.default.findById(req.params.clinicId);

          case 28:
            postResponse = clinic = _context2.sent;
            _context2.next = 31;
            return response.Ok(postResponse);

          case 31:
            res.status(response.statusCode).json(response);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[8, 18]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=feedbacks.js.map
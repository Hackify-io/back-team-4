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
router.post("/:clinicId/feedbacks/", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var getClinicResponse, clinic;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            //Get Prerequirments: Clinic by ClinicId
            getClinicResponse = {};
            //If Clinic is null 

            if (!getClinicResponse.isSuccess) {
              res.status(getClinicResponse.statusCode).json(getClinicResponse);
            }
            clinic = getClinicResponse.result;

            //Create the ClinicReview using the ClinicId

            res.status(response.statusCode).json(response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// @route   POST api/clinics/:id/feedback
// @desc    Remove feedback from clinics
// @access  Private
router.delete("/:clinicId/feedbacks/remove", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var response, _validateFeedbackFiel, errors, isValid;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validateFeedbackFiel = (0, _feedback.validateFeedbackFields)(req.body), errors = _validateFeedbackFiel.errors, isValid = _validateFeedbackFiel.isValid;


            res.status(response.statusCode).json(response);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=feedbacks.js.map
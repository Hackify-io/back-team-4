"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ApiResponse = require("../models/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _Place = require("../models/Place");

var _Place2 = _interopRequireDefault(_Place);

var _place = require("../validations/place");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = (0, _express2.default)();

//import models


// @route   GET api/places
// @desc    Get places
// @access  Public
router.get("/", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var response, places;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = new _ApiResponse2.default();
            _context.prev = 1;
            _context.next = 4;
            return _Place2.default.find();

          case 4:
            places = _context.sent;

            response.Ok(places);
            res.status(response.statusCode).json(response);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);

            response.InternalServerError(_context.t0.message);
            res.status(response.statusCode).json(response);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// @route   GET api/places/:id
// @desc    Get places
// @access  Public
router.get("/:id", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var response, place;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            response = new _ApiResponse2.default();
            _context2.prev = 1;
            _context2.next = 4;
            return _Place2.default.findById(req.params.id);

          case 4:
            place = _context2.sent;

            if (place) {
              _context2.next = 9;
              break;
            }

            _context2.next = 8;
            return response.NotFound();

          case 8:
            return _context2.abrupt("return", res.status(response.statusCode).json(response));

          case 9:
            _context2.next = 11;
            return response.Ok(place);

          case 11:
            res.status(response.statusCode).json(response);
            _context2.next = 19;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);
            _context2.next = 18;
            return response.InternalServerError(_context2.t0.message);

          case 18:
            res.status(response.statusCode).json(response);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 14]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// @route   POST api/places
// @desc    Create places
// @access  Private
router.post("/", function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var response, _validatePlaceFields, errors, isValid, newPlace, postResponse;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validatePlaceFields = (0, _place.validatePlaceFields)(req.body), errors = _validatePlaceFields.errors, isValid = _validatePlaceFields.isValid;

            // Check Validation

            if (isValid) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context3.abrupt("return", res.status(response.statusCode).json(response));

          case 6:
            newPlace = new _Place2.default({
              country: req.body.country,
              state: req.body.state,
              city: req.body.city,
              createdUser: req.body.createdUser,
              createdDate: new Date()
            });
            _context3.prev = 7;
            _context3.next = 10;
            return newPlace.save();

          case 10:
            postResponse = _context3.sent;
            _context3.next = 13;
            return response.Ok(postResponse);

          case 13:
            res.status(response.statusCode).json(response);
            _context3.next = 21;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](7);
            _context3.next = 20;
            return response.InternalServerError(_context3.t0.message);

          case 20:
            res.status(response.statusCode).json(response);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[7, 16]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

router.put("/:id", function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var response, _validatePlaceFields2, errors, isValid, place, updatedPlace, updateResponse, updatedModel;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            response = new _ApiResponse2.default();
            _validatePlaceFields2 = (0, _place.validatePlaceFields)(req.body), errors = _validatePlaceFields2.errors, isValid = _validatePlaceFields2.isValid;

            // Check Validation

            if (isValid) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return response.ValidationError(errors);

          case 5:
            return _context4.abrupt("return", res.status(response.statusCode).json(response));

          case 6:

            //Look if place Exist
            place = void 0;
            _context4.prev = 7;
            _context4.next = 10;
            return _Place2.default.findById(req.params.id);

          case 10:
            place = _context4.sent;

            if (place) {
              _context4.next = 15;
              break;
            }

            _context4.next = 14;
            return response.NotFound();

          case 14:
            return _context4.abrupt("return", res.status(response.statusCode).json(response));

          case 15:
            _context4.next = 22;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](7);
            _context4.next = 21;
            return response.InternalServerError(_context4.t0.message);

          case 21:
            res.status(response.statusCode).json(response);

          case 22:
            updatedPlace = {
              country: req.body.country,
              state: req.body.state,
              city: req.body.city,
              modifiedUser: req.body.modifiedUser,
              modifiedDate: new Date()
            };
            _context4.prev = 23;
            _context4.next = 26;
            return _Place2.default.findOneAndUpdate(req.params.id, {
              $set: updatedPlace
            });

          case 26:
            updateResponse = _context4.sent;
            _context4.next = 29;
            return _Place2.default.findById(updateResponse._id);

          case 29:
            updatedModel = _context4.sent;
            _context4.next = 32;
            return response.Ok(updatedModel);

          case 32:
            res.status(response.statusCode).json(response);
            _context4.next = 40;
            break;

          case 35:
            _context4.prev = 35;
            _context4.t1 = _context4["catch"](23);
            _context4.next = 39;
            return response.InternalServerError(_context4.t1.message);

          case 39:
            res.status(response.statusCode).json(response);

          case 40:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[7, 17], [23, 35]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// @route   DELETE api/places/:id
// @desc    Delete place
// @access  private
router.delete("/:id", function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var response, place;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            response = new _ApiResponse2.default();
            _context5.prev = 1;
            _context5.next = 4;
            return _Place2.default.findById(req.params.id);

          case 4:
            place = _context5.sent;

            if (place) {
              _context5.next = 9;
              break;
            }

            _context5.next = 8;
            return response.NotFound();

          case 8:
            return _context5.abrupt("return", res.status(response.statusCode).json(response));

          case 9:
            _context5.next = 11;
            return place.remove();

          case 11:
            _context5.next = 13;
            return response.NoContent();

          case 13:
            res.status(response.statusCode).json(response);
            _context5.next = 21;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](1);
            _context5.next = 20;
            return response.InternalServerError(_context5.t0.message);

          case 20:
            res.status(response.statusCode).json(response);

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 16]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=places.js.map
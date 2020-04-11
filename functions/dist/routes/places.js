"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _repository = require("./../services/repository");

var _repository2 = _interopRequireDefault(_repository);

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
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _repository2.default.getAll(_Place2.default);

          case 2:
            response = _context.sent;

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

// @route   GET api/places/:id
// @desc    Get places
// @access  Public
router.get("/:id", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _repository2.default.getById(_Place2.default, id);

          case 3:
            response = _context2.sent;

            res.status(response.statusCode).json(response);

          case 5:
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

// @route   POST api/places
// @desc    Create places
// @access  Private
router.post("/", function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _repository2.default.create(_Place2.default, req.body, _place.validatePlaceFields);

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", res.status(response.statusCode).json(response));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// @route   PUT api/places/id
// @desc    Update Place
// @access  Public
router.put("/:id", function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _repository2.default.update(_Place2.default, id, req.body, _place.validatePlaceFields);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", res.status(response.statusCode).json(response));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
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
    var id, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _repository2.default.remove(_Place2.default, id);

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", res.status(response.statusCode).json(response));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

exports.default = router;
//# sourceMappingURL=places.js.map
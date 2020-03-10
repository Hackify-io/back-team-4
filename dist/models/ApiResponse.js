"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isEmpty = require("../validations/is-empty");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiResponse = function () {
  function ApiResponse(props) {
    _classCallCheck(this, ApiResponse);

    this.statusCode = props ? props.statusCode : null;
    this.errorMessage = props ? props.errorMessage : null;
    this.result = props ? props.result : null;
    this.fields = props ? props.errors : null;
    this.isSuccess = props ? props.isSuccess : null;
    this.description = props ? props.description : null;
  }

  _createClass(ApiResponse, [{
    key: "addValidationError",
    value: function addValidationError(key, value) {
      if (this.errors === null) this.errors = new Object();
      this.errors[key] = value;
    }
  }, {
    key: "setResponse",
    value: function setResponse(props) {
      if (!(0, _isEmpty.isEmpty)(props)) {
        if (!(0, _isEmpty.isEmpty)(props.statusCode)) this.statusCode = props.statusCode;
        if (!(0, _isEmpty.isEmpty)(props.errorMessage)) this.errorMessage = props.errorMessage;
        if (!(0, _isEmpty.isEmpty)(props.result)) this.result = props.result;
        if (!(0, _isEmpty.isEmpty)(props.fields)) this.fields = props.fields;
        if (!(0, _isEmpty.isEmpty)(props.isSuccess)) this.isSuccess = props.isSuccess;
        if (!(0, _isEmpty.isEmpty)(props.description)) this.description = props.description;
      }
    }
  }, {
    key: "Ok",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(result) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setResponse({
                  statusCode: 200,
                  description: "Success",
                  isSuccess: true,
                  result: result
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function Ok(_x) {
        return _ref.apply(this, arguments);
      }

      return Ok;
    }()
  }, {
    key: "NoContent",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.setResponse({
                  statusCode: 204,
                  description: "Success",
                  isSuccess: true
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function NoContent() {
        return _ref2.apply(this, arguments);
      }

      return NoContent;
    }()
  }, {
    key: "NotFound",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.setResponse({
                  statusCode: 404,
                  errorMessage: "NO_RESOURCES",
                  isSuccess: false
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function NotFound() {
        return _ref3.apply(this, arguments);
      }

      return NotFound;
    }()
  }, {
    key: "InternalServerError",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.setResponse({
                  statusCode: 500,
                  errorMessage: "INTERNAL_SERVER_ERROR",
                  isSuccess: false,
                  description: err
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function InternalServerError(_x2) {
        return _ref4.apply(this, arguments);
      }

      return InternalServerError;
    }()
  }, {
    key: "ValidationError",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(errors) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.setResponse({
                  statusCode: 422,
                  fields: errors,
                  errorMessage: "VALIDATION_ERROR",
                  isSuccess: false
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function ValidationError(_x3) {
        return _ref5.apply(this, arguments);
      }

      return ValidationError;
    }()
  }, {
    key: "InvalidUrlParameter",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(urlParameterName) {
        var errors;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                errors = new Object();

                errors[urlParameterName] = "Invalid Url Parameter";
                _context6.next = 4;
                return ValidationError(errors);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function InvalidUrlParameter(_x4) {
        return _ref6.apply(this, arguments);
      }

      return InvalidUrlParameter;
    }()
  }]);

  return ApiResponse;
}();

exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map
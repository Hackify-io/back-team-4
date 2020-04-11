'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiResponse = require('../models/ApiResponse');

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
  function Repository() {
    _classCallCheck(this, Repository);
  }

  _createClass(Repository, null, [{
    key: 'getAll',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(DataModel) {
        var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var populateFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var response, promiseValues, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field, values;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                response = new _ApiResponse2.default();
                _context.prev = 1;
                promiseValues = DataModel.find(filter);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 6;

                for (_iterator = populateFields[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  field = _step.value;

                  promiseValues = promiseValues.populate(field);
                }
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 14:
                _context.prev = 14;
                _context.prev = 15;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 17:
                _context.prev = 17;

                if (!_didIteratorError) {
                  _context.next = 20;
                  break;
                }

                throw _iteratorError;

              case 20:
                return _context.finish(17);

              case 21:
                return _context.finish(14);

              case 22:
                _context.next = 24;
                return promiseValues;

              case 24:
                values = _context.sent;

                response.Ok(values);
                return _context.abrupt('return', response);

              case 29:
                _context.prev = 29;
                _context.t1 = _context['catch'](1);

                response.InternalServerError(_context.t1.message);
                return _context.abrupt('return', response);

              case 33:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 29], [6, 10, 14, 22], [15,, 17, 21]]);
      }));

      function getAll(_x) {
        return _ref.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: 'getById',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(DataModel, id) {
        var populateFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var response, promiseValues, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field, values;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                response = new _ApiResponse2.default();
                _context2.prev = 1;
                promiseValues = DataModel.findById(id);
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 6;

                for (_iterator2 = populateFields[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  field = _step2.value;

                  promiseValues = promiseValues.populate(field);
                }
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](6);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 14:
                _context2.prev = 14;
                _context2.prev = 15;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 17:
                _context2.prev = 17;

                if (!_didIteratorError2) {
                  _context2.next = 20;
                  break;
                }

                throw _iteratorError2;

              case 20:
                return _context2.finish(17);

              case 21:
                return _context2.finish(14);

              case 22:
                _context2.next = 24;
                return promiseValues;

              case 24:
                values = _context2.sent;

                response.Ok(values);
                return _context2.abrupt('return', response);

              case 29:
                _context2.prev = 29;
                _context2.t1 = _context2['catch'](1);

                response.InternalServerError(_context2.t1.message);
                return _context2.abrupt('return', response);

              case 33:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 29], [6, 10, 14, 22], [15,, 17, 21]]);
      }));

      function getById(_x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(DataModel) {
        var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var validator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        var response, _validator, errors, isValid, newModel, saveResponse;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                response = new _ApiResponse2.default();

                if (!validator) {
                  _context3.next = 6;
                  break;
                }

                _validator = validator(model), errors = _validator.errors, isValid = _validator.isValid;
                // Check Validation

                if (isValid) {
                  _context3.next = 6;
                  break;
                }

                // If any errors, send 400 with errors object
                response.ValidationError(errors);
                return _context3.abrupt('return', response);

              case 6:
                newModel = new DataModel(model);
                _context3.prev = 7;
                _context3.next = 10;
                return newModel.save();

              case 10:
                saveResponse = _context3.sent;

                response.Ok(saveResponse);
                return _context3.abrupt('return', response);

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](7);

                response.InternalServerError(_context3.t0.message);
                return _context3.abrupt('return', response);

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[7, 15]]);
      }));

      function create(_x7) {
        return _ref3.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(DataModel, id) {
        var model = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var validator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var response, dbModel, dbModelDoc, getResponse, mergedModel, _validator2, errors, isValid, query, key, updatedModel;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                response = new _ApiResponse2.default();
                //Look if model Exist

                dbModel = void 0;
                dbModelDoc = void 0;
                _context4.prev = 3;
                _context4.next = 6;
                return this.getById(DataModel, id);

              case 6:
                getResponse = _context4.sent;

                dbModel = getResponse.result;
                dbModelDoc = dbModel._doc;
                delete dbModelDoc.modifiedUser;

                if (dbModel) {
                  _context4.next = 13;
                  break;
                }

                response.NotFound();
                return _context4.abrupt('return', response);

              case 13:
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](3);

                response.InternalServerError(_context4.t0);
                return _context4.abrupt('return', response);

              case 19:
                mergedModel = _extends({}, dbModel._doc, model);

                if (!validator) {
                  _context4.next = 26;
                  break;
                }

                _validator2 = validator(mergedModel), errors = _validator2.errors, isValid = _validator2.isValid;
                // Check Validation

                if (!model['modifiedUser']) {
                  isValid = false;
                  errors.modifiedUser = 'modifiedUser is Required';
                }

                if (isValid) {
                  _context4.next = 26;
                  break;
                }

                // If any errors, send 400 with errors object
                response.ValidationError(errors);
                return _context4.abrupt('return', response);

              case 26:
                query = { $set: {} };

                for (key in model) {
                  if (dbModel[key] && model[key] && dbModel[key] !== model[key]) {
                    query.$set[key] = model[key];
                  }
                }

                _context4.prev = 28;
                _context4.next = 31;
                return DataModel.updateOne({ _id: id }, query);

              case 31:
                _context4.next = 33;
                return DataModel.findById(id);

              case 33:
                updatedModel = _context4.sent;

                response.Ok(updatedModel);
                return _context4.abrupt('return', response);

              case 38:
                _context4.prev = 38;
                _context4.t1 = _context4['catch'](28);

                response.InternalServerError(_context4.t1.message);
                return _context4.abrupt('return', response);

              case 42:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 15], [28, 38]]);
      }));

      function update(_x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'remove',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(DataModel, id) {
        var response, getResponse, dbModel;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                response = new _ApiResponse2.default();
                _context5.prev = 1;
                _context5.next = 4;
                return this.getById(DataModel, id);

              case 4:
                getResponse = _context5.sent;
                dbModel = getResponse.result;

                if (dbModel) {
                  _context5.next = 9;
                  break;
                }

                response.NotFound();
                return _context5.abrupt('return', response);

              case 9:
                _context5.next = 11;
                return dbModel.remove();

              case 11:
                response.NoContent();
                return _context5.abrupt('return', response);

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5['catch'](1);

                response.InternalServerError(_context5.t0);
                return _context5.abrupt('return', response);

              case 19:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 15]]);
      }));

      function remove(_x14, _x15) {
        return _ref5.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return Repository;
}();

exports.default = Repository;
//# sourceMappingURL=repository.js.map
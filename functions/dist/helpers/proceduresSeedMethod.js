"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedProcedures = undefined;

var _Procedure = require("../models/Procedure");

var _Procedure2 = _interopRequireDefault(_Procedure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var seedProcedures = exports.seedProcedures = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var procedures, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, proc, procedureExist, procedure;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            procedures = ["Chemotherapy", "Stress Treatment", "Tooth Extraction", "Plastic Surgery"];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = procedures[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

            proc = _step.value;
            _context.next = 10;
            return _Procedure2.default.findOne({ name: proc });

          case 10:
            procedureExist = _context.sent;

            if (procedureExist) {
              _context.next = 15;
              break;
            }

            procedure = new _Procedure2.default({
              createdUser: "data seed",
              createdDate: new Date(),
              name: proc
            });
            _context.next = 15;
            return procedure.save();

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function seedProcedures() {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=proceduresSeedMethod.js.map
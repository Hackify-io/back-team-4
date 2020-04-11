"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedPlaces = undefined;

var _Place = require("../models/Place");

var _Place2 = _interopRequireDefault(_Place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var seedPlaces = exports.seedPlaces = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var places, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pl, placeExist, place;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            places = [{
              country: "Mexico",
              state: "Baja California",
              city: "Tijuana"
            }, {
              country: "Mexico",
              state: "Yucatan",
              city: "Merida"
            }, {
              country: "Mexico",
              state: "Jalisco",
              city: "Guadalajara"
            }, {
              country: "Mexico",
              state: "Monterrey",
              city: "Monterrey"
            }];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = places[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

            pl = _step.value;
            _context.next = 10;
            return _Place2.default.findOne({
              country: pl.country,
              state: pl.state,
              city: pl.city
            });

          case 10:
            placeExist = _context.sent;

            if (placeExist) {
              _context.next = 15;
              break;
            }

            place = new _Place2.default({
              createdUser: "data seed",
              createdDate: new Date(),
              country: pl.country,
              state: pl.state,
              city: pl.city
            });
            _context.next = 15;
            return place.save();

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

  return function seedPlaces() {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=placesSeedMethod.js.map
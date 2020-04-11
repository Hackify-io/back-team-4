'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = undefined;

var _keys_local = require('../config/keys_local');

var localKeys = _interopRequireWildcard(_keys_local);

var _keys_dev = require('../config/keys_dev');

var devKeys = _interopRequireWildcard(_keys_dev);

var _keys_uat = require('../config/keys_uat');

var uatKeys = _interopRequireWildcard(_keys_uat);

var _keys_prod = require('../config/keys_prod');

var prodKeys = _interopRequireWildcard(_keys_prod);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var keysHolder = void 0;
if (process.env.NODE_ENV === 'production') {
  keysHolder = prodKeys;
} else if (process.env.NODE_ENV === 'uat') {
  keysHolder = uatKeys;
} else if (process.env.NODE_ENV === 'dev') {
  keysHolder = devKeys;
} else {
  keysHolder = devKeys;
}
var keys = exports.keys = keysHolder.default;
//# sourceMappingURL=keys.js.map
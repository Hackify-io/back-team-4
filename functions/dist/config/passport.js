'use strict';

var _passportJwt = require('passport-jwt');

var _keys = require('../config/keys');

var opts = {};
opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _keys.keys.authSecret;

module.exports = function (passport) {
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload);
  }));
};
//# sourceMappingURL=passport.js.map
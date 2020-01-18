import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { keys } from '../config/keys';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.authSecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      return done(null, jwt_payload);
    })
  );
};

import passportJWT from 'passport-jwt';

import db from '../models';


module.exports = (passport) => {
  const ExtractJwt = passportJWT.ExtractJwt;
  const JwtStrategy = passportJWT.Strategy;
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
  jwtOptions.secretOrKey = process.env.SECRET;

  const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    const user = db.User.findOne({ email: jwtPayload.email });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  passport.use(strategy);
};


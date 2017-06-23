import passportJWT from 'passport-jwt';

import db from '../models';


module.exports = (passport) => {
  const ExtractJwt = passportJWT.ExtractJwt;
  const JwtStrategy = passportJWT.Strategy;
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
  jwtOptions.secretOrKey = process.env.SECRET;

  const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    return db.User.findOne({ where: { email: jwtPayload.email } })
      .then((user) => {
        return next(null, user);
      })
      .catch(() => next(null, false));
  });
  passport.use(strategy);
};


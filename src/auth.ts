import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import UserRepository from './modules/accounts/repos/UserRepository';

const applySome = (passport: PassportStatic) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'MY_SECRET',
  };

  passport.use(
    new Strategy(options, (payload, done) => {
      getCustomRepository(UserRepository)
        .findOne({ id: payload.id })
        .then((user) => {
          if (user) {
            return done(null, {
              id: payload.id,
            });
          }

          return done(null, false);
        })
        .catch((err) => done(err, false));
    }),
  );
};

export default applySome;

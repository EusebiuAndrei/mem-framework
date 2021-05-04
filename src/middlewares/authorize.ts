import passport from 'passport';

const authorize = passport.authenticate('jwt', { session: false });

export default authorize;

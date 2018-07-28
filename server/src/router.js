const User = require('./controllers/user');
const Authentication = require('./controllers/authentication');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (app) {

  app.post('/signup', User.signup);
  app.post('/signin', User.signin);
  app.get('/me', requireAuth, User.me);
  app.post('/changePassword', requireAuth, User.changePassword);
  app.post('/update', requireAuth, User.update);
  app.get('/users', requireAuth, User.getusers);

}
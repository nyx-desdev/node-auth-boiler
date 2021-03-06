const Authentication = require('./controllers/authentication');
require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
};

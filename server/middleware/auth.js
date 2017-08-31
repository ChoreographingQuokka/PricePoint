const config = require('config')['redis'];
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(config.connection);

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

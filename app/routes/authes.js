var express         = require('express');
var passport        = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var CONFIG          = require('../../config');

var router = express.Router();
var User = require('../models/user');

// Initialize passport
(function() {
  console.log('init!!!');

  passport.use(new TwitterStrategy({
      consumerKey:    CONFIG.auth.twitter.token,
      consumerSecret: CONFIG.auth.twitter.secret,
      callbackURL:    CONFIG.auth.twitter.callbackUrl
    }, function(token, tokenSecret, profile, done) {
      User.signin(token, tokenSecret, profile, function(err, userId) {
        done(null, profile);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });

    done(null, id);
  });
})();

// Routing
router.get('/signin',   passport.authenticate('twitter'));
router.get('/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;

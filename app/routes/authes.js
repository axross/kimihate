var async           = require('async');
var express         = require('express');
var passport        = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var CONFIG          = require('../../config');

var router = express.Router();
var User = require('../models/user');

// Initialize passport
(function() {
  passport.use(new TwitterStrategy({
      consumerKey:    CONFIG.auth.twitter.token,
      consumerSecret: CONFIG.auth.twitter.secret,
      callbackURL:    CONFIG.auth.twitter.callbackUrl
    }, function(token, tokenSecret, profile, done) {
      var id       = profile.id;
      var username = profile.username;
      var thumbUrl = profile.photos[0].value;
      var now      = new Date();

      async.waterfall([
        function(next) {
          User.findOne({ id: id }).exec(function(err, docs) {
            next(err, docs);
          });
        },
        function(docs, next) {
          if (docs) {
            // Update user if exist
            User.update({ id: id }, {
              username:       username,
              thumbUrl:       thumbUrl,
              lastSigninedAt: now
            }, {}, function(err, docs) {
              next(err, docs);
            });
          } else {
            // Create user
            User.create({
              id:             id,
              username:       username,
              thumbUrl:       thumbUrl,
              signupedAt:     now,
              lastSigninedAt: now
            }, function(err, docs) {
              next(err, docs);
            });
          }
        }
      ], function(err, result) {
        if (err) console.error(err);

        done(null, profile);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });
})();

// Routing in passport
router.get('/signin',   passport.authenticate('twitter'));
router.get('/callback', passport.authenticate('twitter', {
  successRedirect: '/auth/done',
  failureRedirect: '/auth/fail'
}));

// Routing
router.get('/done', function(req, res) {
  req.session.userId = req.session.passport.user;
  req.session.passport = null;

  res.redirect(302, '/');
});

router.get('/fail', function(req, res) {
  req.session.passport = null;

  res.redirect(302, '/');
});

router.get('/signout', function(req, res) {
  req.session.userId = undefined;

  res.redirect(302, '/');
});

module.exports = router;

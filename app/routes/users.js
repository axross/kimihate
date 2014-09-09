var express = require('express');

var router = express.Router();
var User   = require('../models/user');

var findUser = function(userId, callback) {
  // TODO:
  // validate
  // user not null
  // user not NaN
  //

  User
    .findOne()
    .where('id').equals(userId)
    .exec(function(err, doc) {
      if (err) console.error(err);

      callback(doc);
    });
};

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/me', function(req, res) {
  var userId = Number(req.session.userId);

  if (!req.session.userId) {
    return res.json({
      status: false,
      messages: ['NOT_AUTHENTICATED'],
      user: null
    });
  }

  findUser(userId, function(user) {
    res.json({
      status: true,
      messages: [],
      user: user
    });
  });
});

router.get('/:id([1-9][0-9]*)', function(req, res) {
  var userId = Number(req.params.id);

  if (!req.session.userId) {
    return res.json({
      status: false,
      messages: ['NOT_AUTHENTICATED'],
      user: null
    });
  }

  findUser(userId, function(user) {
    res.json({
      status: true,
      messages: [],
      user: user
    });
  });
});

module.exports = router;

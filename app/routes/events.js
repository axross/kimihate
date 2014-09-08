var express = require('express');
var router  = express.Router();

var Event   = require('../models/event');

router.get('/', function(req, res) {
  var lastId = Number(req.param('last_id', 2147483647));
  var limit  = Number(req.param('limit',  20));

  if (limit > 100) { limit = 100; }

  Event
    .find()
    .where('id').lt(lastId)
    .limit(limit)
    .sort('-id')
    .exec(function(err, docs) {
      if (err) console.error(err);

      res.json({
        status:   true,
        messages: [],
        events:  docs
      });
    });
});

module.exports = router;

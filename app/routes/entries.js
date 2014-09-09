var express = require('express');
var router  = express.Router();

var Entry   = require('../models/entry');

router.get('/', function(req, res) {
  var lastId = Number(req.param('last_id', 2147483647));
  var limit  = Number(req.param('limit',   20));

  if (limit > 100) { limit = 100; }

  Entry
    .find()
    .where('id').lt(lastId)
    .limit(limit)
    .sort('-id')
    .exec(function(err, docs) {
      if (err) console.error(err);

      res.json({
        status:   true,
        messages: [],
        entries:  docs
      });
    });
});

module.exports = router;

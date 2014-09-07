var express = require('express');
var router  = express.Router();

var Entry   = require('../models/entry');

router.get('/', function(req, res) {
  var gt = 0;

  Entry
    .find()
    .where('id').gt(gt)
    .limit(20)
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

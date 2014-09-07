var express = require('express');
var router = express.Router();
var CONFIG = require('../../config');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: CONFIG.title });
});

module.exports = router;

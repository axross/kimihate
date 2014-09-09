var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/me', function(req, res) {
  res.json(req.session);
});

router.get('/:id([1-9][0-9]*)', function(req, res) {
  res.send(req.params.id);
});

module.exports = router;

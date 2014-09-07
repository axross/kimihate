// Require packages
var async    = require('async');
var request  = require('superagent');
var cheerio  = require('cheerio');
var mongoose = require('mongoose');
var Event    = require('../models/event');
var CONFIG   = require('../../config');

// Fetch from connpass
var fetch = function(url, next) {
  request.get(url).end(function(err, res) {
    if (err || res.statusCode !== 200) return console.log('error', err);

    console.log(res);

    var events = JSON.parse(res.text).events;

    next(null, events);
  });
};

// Save to database
var save = function(events, next) {
  async.each(events, function(_event, next_) {
    var event = {
      id:              _event.event_id,
      title:           _event.title,
      description:     _event.catch,
      date:            _event.started_at,
      nowParticipants: _event.accepted + _event.waiting,
      maxParticipants: _event.limit,
      venue:           _event.address + ' ' + _event.place,
      tags:            []
    };

    Event.create(event, function(err, result) {
      if (err) return console.log(err);

      console.log(result);
      console.log('created!');

      next_();
    });
  }, function(err) {
    next(err);
  });
};

// Entrypoint
(function() {
  var times;

  if (Number(process.argv[2]) !== Number(process.argv[2])) return;
  if (process.argv[2] < 1) return;
  if (process.argv[2] % 100 !== 0) return;
  times = process.argv[2] / 100

  console.log('fetching...');

  mongoose.connect(CONFIG.db.uri, CONFIG.db.name);

  async.times(times, function(n, next) {
    var url = 'http://connpass.com/api/v1/event/?count=100&start='
              + (n * 20 + 1);

    async.waterfall([
      function(next_) {
        fetch(url, next_);
      },
      function(entries, next_) {
        save(entries, next_);
      }
    ], function(err) {
      next(null);
    });
  }, function() {
    mongoose.disconnect();
  });
})();

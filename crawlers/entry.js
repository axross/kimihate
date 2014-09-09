// Require packages
var _        = require('underscore');
var async    = require('async');
var request  = require('superagent');
var cheerio  = require('cheerio');
var mongoose = require('mongoose');
var Entry    = require('../app/models/entry');
var CONFIG   = require('../config');

// Fetch from hatena bookmark
var fetch = function(url, next) {
  request.get(url).end(function(err, res) {
    if (err || res.statusCode !== 200) return console.log('error', err);

    var $entry, entry;
    var $ = cheerio.load(res.text);
    var $entrylist = $('.entrylist .entrylist-unit');
    var entries = [];

    $entrylist.each(function(key, value) {
      $entry = cheerio.load($.html(value));

      entry = {
        id:          $entry('.entrylist-unit').data('eid'),
        url:         $entry('.entry-link').attr('href'),
        title:       $entry('.entry-link').text(),
        stars:       $entry('.users span').text() - 0,
        description: $entry('.description blockquote').text(),
        date:        new Date($entry('.date').text()),
        thumbUrl:    $entry('.thumbnail img').attr('src') || '',
        faviconUrl:  $entry('.favicon').attr('src') || '',
        tags:        [$entry('a.category').text()]
      };

      $entry('.tag a').each(function(index, element) {
        entry.tags.push($(this).text());
      });
      entry.tags = _.uniq(entry.tags);

      entries.push(entry);
    });

    next(err, entries);
  });
};

// Save to database
var save = function(entries, next) {
  async.each(entries, function(entry, next_) {
    Entry.update({ id: entry.id }, entry, { upsert: true }, function(err, result) {
      if (err) return console.log(err);

      if (isNaN(result)) {
        console.log('created : ' + entry.title);
      } else {
        console.log('updated : ' + entry.title);
      }

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
  times = process.argv[2] / 20

  console.log('fetching...');

  mongoose.connect(CONFIG.db.uri, CONFIG.db.name);

  async.times(times, function(n, next) {
    var url = 'http://b.hatena.ne.jp/entrylist/it?layout=list&of='
              + (n * 20);

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

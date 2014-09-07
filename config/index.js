var config    = require('./config.json');
var devConfig = require('./dev.json');
var proConfig = require('./pro.json');

var mergeObject = function(obj1, obj2) {
  var retObj = {};

  for (var key in obj1) { retObj[key] = obj1[key] }
  for (var key in obj2) { retObj[key] = obj2[key] }

  return retObj;
};

if (process.env.NODE_ENV === 'production') {
  config = mergeObject(config, proConfig);
} else {
  config = mergeObject(config, devConfig);
}

module.exports = config;

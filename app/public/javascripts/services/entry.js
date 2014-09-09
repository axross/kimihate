module.exports = function(app) {
  app.factory('Entry', ['$http', function($http) {
    var get = function(option, callback) {
      if (!option) return callback(null);

      var lastId = option.lastId || 2147483647;
      var limit  = option.limit  || 20;

      $http.get('/entry', { params: { last_id: lastId, limit: limit } })
        .error(function(data, err) {
          errorCallback(data, err, callback);
        })
        .success(function(data, err) {
          var entries = data.entries;

          // entires, lastId, isEnd
          callback(entries, entries[entries.length - 1].id, (entries.length !== limit));
        });

    };

    var errorCallback = function(data, err) {
      console.error(err);

      callback(null);
    };

    return {
      get: get
    };
  }]);
};

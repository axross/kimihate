module.exports = function(app) {
  app.factory('Event', ['$http', function($http) {
    var getAll = function(offset, callback) {
      $http.get('/events', { params: { offset: offset } })
        .success(function(data, err) {
          callback(data.events);
        });
    };

    var getByTabId = function(tabId, offset, callback) {
      $http.get('/events/' + tabId, { params: { offset: offset } })
        .success(function(data, err) {
          callback(data.events);
        });
    };

    return {
      getAll:     getAll,
      getByTabId: getByTabId
    };
  }]);
};

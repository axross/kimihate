module.exports = function(app) {
  app.factory('Entry', ['$http', function($http) {
    var getAll = function(offset, callback) {
      $http.get('/entry', { params: { offset: offset } })
        .success(function(data, err) {
          callback(data.entries);
        });
    };

    var getByTabId = function(tabId, offset, callback) {
      $http.get('/entry/' + tabId, { params: { offset: offset } })
        .success(function(data, err) {
          callback(data.entries);
        });
    };

    return {
      getAll:     getAll,
      getByTabId: getByTabId
    };
  }]);
};

module.exports = function(app) {
  app.factory('Event', ['$http', function($http) {
    var Event = function(option) {
      this.lastId    = option && option.lastId || 2147483647;
      this.limit     = option && option.limit  || 20;
      this.isEnd     = false;
      this.isLoading = false;
      this.items     = [];
    };

    Event.prototype.fetch = function(callback) {
      var self = this;

      if (self.isLoading) {
        console.log('stop');
        return callback(false);
      }

      $http.get('/event', { params: {
        last_id: self.lastId,
        limit: self.limit
      } })
        .error(function(data, err) {
          console.error(err);

          if (callback && callback.constructor === Function) {
            callback(null);
          }
        })
        .success(function(data, err) {
          var entries = data.entries;

          self.lastId    = entries[entries.length - 1].id;
          self.isEnd     = (entries.length !== self.limit);
          self.isLoading = true;
          self.items     = self.items.concat(entries);

          setTimeout(function() { self.isLoading = false }, 500);

          if (callback && callback.constructor === Function) {
            callback(entries);
          }
        });
    };

    return Event;
  }]);
};

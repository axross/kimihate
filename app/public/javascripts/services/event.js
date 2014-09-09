module.exports = function(app) {
  app.factory('EventVM', ['$http', function($http) {
    var EventVM = function(option) {
      this.lastId    = option && option.lastId || 2147483647;
      this.limit     = option && option.limit  || 20;
      this.isEnd     = false;
      this.isLoading = false;
      this.items     = [];
    };

    EventVM.prototype.fetch = function(callback) {
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
          var events = data.events;

          self.lastId    = events[events.length - 1].id;
          self.isEnd     = (events.length !== self.limit);
          self.isLoading = true;
          self.items     = self.items.concat(events);

          setTimeout(function() { self.isLoading = false }, 500);

          if (callback && callback.constructor === Function) {
            callback(events);
          }
        });
    };

    return EventVM;
  }]);
};

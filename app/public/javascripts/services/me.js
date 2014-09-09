module.exports = function(app) {
  app.factory('Me', ['$http', function($http) {
    var Me = function() {
      this.id             = null;
      this.username       = null;
      this.thumbUrl       = null;
      this.signupedAt     = null;
      this.lastSigninedAt = null;
      this.journals       = [];

      this.isInitialized  = false;

      this.init();
    };

    Me.prototype.init = function(callback) {
      var self = this;

      $http.get('/user/me')
        .success(function(data, err) {
          if (data.messages.indexOf('NOT_AUTHENTICATED') > -1) {
            self.isInitialized  = true;

            callback(self);
          } else {
            var user = data.user;

            self.isInitialized  = true;
            self.id             = user.id;
            self.username       = user.username;
            self.thumbUrl       = user.thumbUrl;
            self.signupedAt     = user.signupedAt;
            self.lastSigninedAt = user.lastSigninedAt;
            self.journals       = user.jounals;

            if (callback && callback.constructor === Function) {
              callback(self);
            }
          }
        });
    };

    return new Me();
  }]);
};

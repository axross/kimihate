module.exports = function(app) {
  app.factory('Me', ['$http', function($http) {
    var user = null;

    var init = function(callback) {
      $http.get('/users/me')
        .success(function(data, err) {
          if (data.errors.indexOf('INVALID_PARAMETERS') > -1 ||
              data.errors.indexOf('USER_FORBIDDEN') > -1) {
            console.log('signouted');
          } else {
            user = data.user;

            if (!user) { console.log('user error!'); }

            callback(user);
          }
        });
    };

    return {
      init: init,
      user: user
    };
  }]);
};

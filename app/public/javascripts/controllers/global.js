module.exports = function(app) {
  app.controller('globalController', ['$scope', '$state', 'Me', function($scope, $state, Me) {
    // Unscoped variables
    var init = function() {
      Me.init(function(me) {
        $scope.me = me;
      });
    };

    // Scoped values
    $scope.me = null;

    // Scoped methods
    $scope.go = function(state, params) {
      $state.go(state, params);
    };

    // Initialize
    init();
  }]);
};

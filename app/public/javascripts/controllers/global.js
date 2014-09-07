module.exports = function(app) {
  app.controller('globalController', ['$scope', '$state', 'Me', function($scope, $state, Me) {
    // Unscoped methods
    var init = function() {
      // Meの状態を確認する
      if (!Me.user) {
        // ログイン前
        Me.init(function(user) {
          $scope.user = user;
          $scope.tabs = user.tabs;
          console.log($scope.user);
        });
      } else {
        // ログイン後
        $scope.user = Me.user;
        $scope.tabs = Me.user.tabs;
        console.log($scope.user);
      }
    };

    // Scoped values
    $scope.user = null;
    $scope.tabs = [];

    // Scoped methods
    // $scope.go = function(state, params) {
    //   $state.go(state, params);
    // };

    // Initialize
    init();
  }]);
};

var $ = require('jquery');

module.exports = function(app) {
  app.controller('showController', ['$scope', '$stateParams', 'Entry', function($scope, $stateParams, Entry) {
    // Unscoped values
    var tabId = $stateParams.id || null;
    var entry = new Entry();

    // Scoped values
    $scope.entries = entry.items;
    $scope.events  = event.items;

    // Autopaging
    $(window).scroll(function(e) {
      var scrollTop     = $(window).scrollTop();
      var windowHeight  = $(window).height();
      var contentHeight = $(document).height();

      if (!entry.isLoading && windowHeight + scrollTop + 512 > contentHeight) {
        entry.fetch(function() {
          $scope.entries = entry.items;
        });
      }
    });

    // Initialize
    $scope.$on('$stateChangeSuccess', function() {
      entry.fetch(function() {
        $scope.entries = entry.items;
      });
    });
  }]);
};

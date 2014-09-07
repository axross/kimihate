var $ = require('jquery');

module.exports = function(app) {
  app.controller('showController', ['$scope', '$stateParams', 'Entry', function($scope, $stateParams, Entry) {
    // Unscoped values
    var tabId     = $stateParams.id || null;
    var nowOffset = 0;
    var isLoading = false;
    var isEnd     = false;

    var fetchEntries = function() {
      if (tabId) {
        Entry.getByTabId(tabId, nowOffset, function(entries) {
          $scope.entries = $scope.entries.concat(entries);
          nowOffset += entries.length;
          if (entries.length !== 20) { isEnd = true; }

          setTimeout(function() { isLoading = false }, 500);
        });
      } else {
        Entry.getAll(nowOffset, function(entries) {
          $scope.entries = $scope.entries.concat(entries);
          nowOffset += entries.length;
          if (entries.length !== 20) { isEnd = true; }

          setTimeout(function() { isLoading = false }, 500);
        });
      }
    };

    // Scoped values
    $scope.entries = [];

    // Autopaging
    $(window).scroll(function(e) {
      if (isEnd) { return; }

      var scrollTop     = $(window).scrollTop();
      var windowHeight  = $(window).height();
      var contentHeight = $(document).height();

      if (!isLoading && windowHeight + scrollTop + 512 > contentHeight) {
        isLoading = true;
        fetchEntries();
      }
    });

    // Initialize
    $scope.$on('$stateChangeSuccess', function() {
      fetchEntries();
    });
  }]);
};

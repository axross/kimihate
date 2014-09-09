var $ = require('jquery');

module.exports = function(app) {
  app.controller('showController', ['$scope', '$stateParams', 'Entry', function($scope, $stateParams, Entry) {
    // Unscoped values
    var tabId     = $stateParams.id || null;
    var lastId    = 0;
    var isLoading = false;
    var isEnd     = false;

    var fetchEntry = function() {
      Entry.get({
        lastId: lastId
      }, function(entries, _lastId, _isEnd) {
        lastId = _lastId;
        isEnd  = _isEnd;

        $scope.entries = $scope.entries.concat(entries);

        setTimeout(function() { isLoading = false }, 500);
      });
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
        fetchEntry();
      }
    });

    // Initialize
    $scope.$on('$stateChangeSuccess', function() {
      fetchEntry();
    });
  }]);
};

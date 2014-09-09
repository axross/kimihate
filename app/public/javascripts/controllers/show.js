var $ = require('jquery');

module.exports = function(app) {
  app.controller('showController', ['$scope', '$stateParams', 'EntryVM', 'EventVM', function($scope, $stateParams, EntryVM, EventVM) {
    // Unscoped values
    var tabId = $stateParams.id || null;
    var entryVM = new EntryVM();
    var eventVM = new EventVM();

    // Scoped values
    $scope.entries = entryVM.items;
    $scope.events  = eventVM.items;

    // Autopaging
    $(window).scroll(function(e) {
      var scrollTop     = $(window).scrollTop();
      var windowHeight  = $(window).height();
      var contentHeight = $(document).height();

      if (!entryVM.isLoading && windowHeight + scrollTop + 512 > contentHeight) {
        entryVM.fetch(function() {
          $scope.entries = entryVM.items;
        });
      }
    });

    // Initialize
    $scope.$on('$stateChangeSuccess', function() {
      entryVM.fetch(function() {
        $scope.entries = entryVM.items;
      });

      eventVM.fetch(function() {
        $scope.events = eventVM.items;
      });
    });
  }]);
};

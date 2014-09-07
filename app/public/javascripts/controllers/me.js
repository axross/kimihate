module.exports = function(app) {
  app.controller('meController', ['$scope', '$stateParams', 'Entry', function($scope, $stateParams, Entry) {
    // Unscoped values


    // Scoped values
    $scope.tabs = [
      { id: 1, title: 'Javascript', stars: 5, words: ['Javascript', 'Node.js', 'Angular'] },
      { id: 1, title: 'Javascript', stars: 5, words: ['Javascript', 'Node.js', 'Angular'] },
      { id: 1, title: 'Javascript', stars: 5, words: ['Javascript', 'Node.js', 'Angular'] }
    ];

    // Initialize
    $scope.$on('$stateChangeSuccess', function() {

    });
  }]);
};

'use strict';

var $       = require('jquery');
var angular = require('angular');
              require('angular-module-animate');
              require('angular-ui-router');
var app     = angular.module('kimihate', ['ngAnimate', 'ui.router']);

// Require services
require('./services/me.js')(app);

// Require viewmodels
require('./services/entry.js')(app);
require('./services/event.js')(app);

// Require controllers
require('./controllers/global.js')(app);
require('./controllers/show.js')(app);
require('./controllers/me.js')(app);

// Require filters
require('./filters/tinydate.js')(app);

// Configuration
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // Set default state to entrypoint
  $urlRouterProvider.otherwise('/');

  // Set routes
  $stateProvider
    .state('entrypoint', {
      url: '/',
      templateUrl: '/templates/show.html',
      controller:  'showController'
    })
    .state('show', {
      url: '/{id:[1-9][0-9]*}',
      templateUrl: '/templates/show.html',
      controller:  'showController'
    })
    .state('me', {
      url: '/me',
      templateUrl: '/templates/me.html',
      controller:  'meController'
    });
}]);

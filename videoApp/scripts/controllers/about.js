'use strict';

/**
 * @ngdoc function
 * @name videoappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the videoappApp
 */
angular.module('videoappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

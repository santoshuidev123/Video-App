'use strict';


angular.module('videoappApp')
    .directive('vaVideoTable', function() {
        return {
            restrict: 'A',
            templateUrl: 'views/videoTable.html',
            link: function(scope, element, attrs, ngModel) {
                
            }
        }
    });
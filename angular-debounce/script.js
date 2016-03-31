(function() {
    'use strict';
    angular.module('MyModule', [])
        .controller('Main', ['$scope', function($scope) {
            $scope.$watch('foo', xs => console.info('foo = %o', xs));
        }]);
})();

(function() {
    'use strict';
    angular.module('MyModule', [])
        .controller('Main', ['$scope', function($scope) {
            $scope.bar = 'Main.bar';
            $scope.foo = 'Main.foo';
            //$scope.$watchCollection('[foo, bar]', xs => console.info(xs));
            $scope.$watch('foo', xs => console.info('foo = %o', xs));
            $scope.$watch('bar', xs => console.info('bar = %o', xs));
        }]).directive('foo', [function() {
            return {
                scope: {
                    foo: '='
                },
                template: '<p><input ng-model="foo"/></p><pre>foo = {{foo}}</pre>'
            }
        }]);
})();

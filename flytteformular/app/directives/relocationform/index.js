angular.module('relocationform')
    .directive('product', function() {
        return {
            templateUrl: 'app/templates/product.html',
            restrict: 'E',
            scope: {
                product: '=',
                type: '@'
            }
        };
    });

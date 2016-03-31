angular.module('relocationform')
    .controller('formController',
        ['$scope', 'product', 'addon',
        function($scope, product, addon) {
        // Sample data:
        $scope.user =
            { "name": "John Doe"
            , "address": "Somewhere Over The Rainbow"
            , "phone": "+45 0000 0000"
            , "email": "someone@example.org"
            , "cpr": "00000000-0000"
            };
        $scope.relocation =
            { "moveDate": new Date("2016-03-01T23:00:00.000Z")
            , "measure": 8432
            , "measureDate": new Date("2016-03-02T23:00:00.000Z")
            , "address": "House of the Rising Sun"
            };
        $scope.product = {};
        $scope.conditions =
            { "newsletter": false
            , "eula": true
            , "monthlyInvoice": true
            , "emailInvoices": true
            };
        product.then(function(products) {
            $scope.products = products;
        });
        addon.then(function(addons) {
            $scope.addons = addons;
        });

        // function to process the form
        $scope.submit = function() {
            console.info('submit', $scope.user);
        };
        // I'm not a big fan of having this toggle-thing in this
        // controller, but for now, I guess it'll have to do.
        $scope.toggleSelectProd = function(p) {
            p.selected = !p.selected;
        };
    }]);

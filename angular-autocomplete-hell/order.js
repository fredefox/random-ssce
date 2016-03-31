angular.module('energinord')
    .controller('order',
        ['$scope', function ($scope) {
        function dummyData() {
            console.warn('Using hard-coded dummy data');
            return {
                  user: { "name": "Frank Funky Iversen", "cpr": "555555-0000", "email": "fhi@netcompany.com", "phone": "+45 4173 0272"}
                , conditions: { "newsletter" : false, "eula": true, "emailInvoices": true }
                , relocation:
                    { "meterId": null
                    , "measureDate": null
                    , "measure": null
                    }
                , contract:
                    { "startDate": new Date("2016-03-17T23:00:00.000Z")
                    , "installationAddress": "Et sted i Tranbjerg"
                    , "invoiceAddress": "Et sted i Tranbjerg"
                    , "usageEstimate": 2000
                    }
                };
        }
        function initialModel() {
            return {
                  user: { "name": null, "cpr": null, "email": null, "phone": null }
                , conditions: { "newsletter" : null, "eula": null, "emailInvoices": null }
                , relocation: { "meterId": null, "measureDate": null, "measure": null }
                , contract:
                    { "startDate": null
                    , "installationAddress": null
                    , "invoiceAddress": null
                    , "usageEstimate": null,
                    }
                , product: null
                }
        }
        angular.extend($scope, initialModel());
        // Might there be an issue with loading stuff from url-parameters
        // when we instantiate this controller?

        var placeOrder = function () {
            console.error('order.placeOrder: Not implemented.');
        }
        // function to process the form
        $scope.submit = function () {
            var d = {
                user: $scope.user, conditions: $scope.conditions,
                contract: $scope.contract, product: $scope.product,
                relocation: $scope.relocation
            };
            console.info('submit', d);
            placeOrder();
        };
        // I'm not a big fan of having this toggle-thing in this
        // controller, but for now, I guess it'll have to do.
        $scope.toggleSelectProd = function (p) {
            p.selected = !p.selected;
        };
        var calculateTotalPrice = function() {
            console.error('order.calculateTotalPrice: Not implemented');
        }
        $scope.$watchCollection('products', function (ps) {
            if (ps === undefined) return;
            $scope.totalPrice = calculateTotalPrice(ps);
        });

        // Is `a` a mandatory addon?
        $scope.isMandatory = function(a) {
            return a.ProduktTilvalg.KraevetValg;
        };

        $scope.$watch('product.addons', function (as) {
            if (as === undefined || as === null) return;
            as.forEach(function(a) {
                if (a.ProduktTilvalg.KraevetValg)
                    // All mandatory options *must* be chosen.
                    a.isChosen = true;
            });
        }, true);

        $scope.cprRe = /^(\d{6})-?(\d{4})$/;

        $scope.$watch('user.cpr', function (cpr) {
            if (cpr === undefined || cpr === null) return;
            // This check, I believe, should be redundant:
            if (!$scope.cprRe.test(cpr)) {
                console.warn('CPR malformed.');
                return;
            }
            stamdata.cpr({ cpr: cpr }).$promise.then(function (r) {
                console.warn('Do something with the newly loaded cpr-data.', r);
            });
        });

        $scope.$watch('installationAddressSearchText', function (searchText) {
            console.info('order.installationAddressSearchText = %o', searchText);
        });
        $scope.$watch('contract.installationAddress', function (address) {
            console.info('order.installationAddress = %o', address);
        });
        return;

        //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
         // Beginning of section: Ugly-looking stuff \\
          //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        /* I have some ideas on how to improve this, but no time. */
        function setChoices(what, xs) {
            $scope[what] = $.map(xs, function (x) {
                return {
                    key: x.Tekst,
                    value: x
                };
            });
        }
        function doDat(prop) {
            console.info(prop + 'SearchText');
            $scope.$watch(prop + 'SearchText', function (searchText) {
                console.info(searchText);
                if (searchText === undefined || searchText == null) return;
                stamdata.suggestion({ q: searchText }).$promise.then(function (addrs) {
                    setChoices(prop + 'Suggestions', addrs);
                });
            });

            var propUp = prop.charAt(0).toUpperCase() + prop.slice(1);
            $scope['updateChoice' + propUp]= function (addr) {
                $scope.contract.installationAddress = addr;
            };
        }

        doDat('installationAddress');

        $scope.installationAddressSearchText = 'for helvede ikkå';
          ////////////////////////////////////////
         // End of section: Ugly-looking stuff //
        ////////////////////////////////////////
    }]);

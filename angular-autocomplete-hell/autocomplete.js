angular.module('energinord')
    .directive('autocomplete', function() {
        return {
            templateUrl: 'autocomplete.html',
            restrict: 'E',
            scope: {
                value: '=',
                suggestions: '=',
                xClass: '@',
                xName: '@',
                xPlaceholder: '@',
                choiceSelected: '='
            },
            controller: function ($scope) {
                function setFoundFullyEvaluatedAddress(addr) {
                    console.warn('Probably not correct anymore.');
                    // This is totally specific to addresses:
                    $scope.foundFullyEvaluatedAddress = Boolean(addr);
                }

                $scope.$watch('suggestions', function (xs) {
                    // TODO: There is a bug here:
                    // When the user picks one of the suggestions `value` is changed
                    // to indicate the full text of the chosen suggestion.
                    // This in turn triggers a change in `product-guide`
                    // that then loads suggestions for this new query (the full
                    // name of the chosen address).
                    if(xs && xs.length !== 0)
                        $scope.displaySuggestions = true;
                });

                $scope.chooseSuggestion = function (s) {
                    $scope.displaySuggestions = false;
                    $scope.value = s.key;
                    var v = s.value;
                    $scope.choiceSelected(v);
                    setFoundFullyEvaluatedAddress(v);
                };
                $scope.$watch('value', function (v) { console.info(v); });
            }
        };
    });

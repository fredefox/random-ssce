// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('relocationform', ['ngAnimate', 'ui.router'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'app/views/relocationform/index.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.userinfo', {
            url: '/userinfo',
            templateUrl: 'app/views/relocationform/userinfo.html'
        })

        // url will be /form/interests
        .state('form.expenditure', {
            url: '/expenditure',
            templateUrl: 'app/views/relocationform/expenditure.html'
        })

        // url will be /form/payment
        .state('form.product', {
            url: '/product',
            templateUrl: 'app/views/relocationform/product.html'
        })

        .state('form.summary', {
            url: '/summary',
            templateUrl: 'app/views/relocationform/summary.html'
        });

    // catch all route
    // send users to the form page
    // TODO: Not sure about this!
    $urlRouterProvider.otherwise('form/userinfo');
});

'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('register', {
        url: '/register',
        controller: 'registerController',
        controllerAs: 'registerController',
        views: {
            '': {
                templateUrl: "templates/routing/register-login.tpl.html",
                controller: function ($scope) {
                    return $scope.pageTitle = 'Register';
                }
            },
            'content@register': {
                templateUrl: "templates/routing/register.tpl.html"
            }
        }
    });
});

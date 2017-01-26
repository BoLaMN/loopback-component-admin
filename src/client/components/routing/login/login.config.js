'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('login', {
        url: '/login',
        views: {
            '': {
                templateUrl: "templates/routing/register-login.tpl.html",
                controller: function ($scope) {
                    return $scope.pageTitle = 'Login';
                }
            },
            'content@login': {
                templateUrl: "templates/routing/login.tpl.html",
                controller: 'loginController',
                controllerAs: 'loginController'
            }
        }
    });
});

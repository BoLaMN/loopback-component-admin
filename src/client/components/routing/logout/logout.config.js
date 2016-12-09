'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('logout', {
        url: '/logout',
        controller: 'logoutController',
        controllerAs: 'logoutController'
    });
});

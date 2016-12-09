'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('dashboard', {
        parent: 'browser',
        url: '/dashboard',
        controller: 'DashboardController',
        controllerAs: 'dashboardController',
        templateUrl: "templates/routing/dashboard.tpl.html",
        resolve: {
            models: function (config) {
                return config.getModels();
            }
        }
    });
});

'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    $stateProvider.state('ban', {
        url: '/baneados',
        parent: 'browser',
        controller: 'BanController',
        controllerAs: 'banController',
        templateUrl: 'templates/routing/ban.tpl.html',
        resolve: {
            model: function (config) {
                return config.getModel('BanReport');
            }
        }
    });
});

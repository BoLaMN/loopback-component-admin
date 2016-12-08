'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    $stateProvider.state('list', {
        url: '/:model/list',
        parent: 'browser',
        controller: 'ListController',
        controllerAs: 'listController',
        templateUrl: 'templates/routing/list.tpl.html',
        resolve: {
            model: function (config, $stateParams) {
                return config.getModel($stateParams.model);
            }
        }
    });
});

'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('error', {
        parent: 'app',
        templateUrl: 'templates/routing/error.tpl.html',
        onEnter: function (config, $log, $state) {
            return $log.error(config, $state);
        }
    });
});

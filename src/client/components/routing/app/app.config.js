'use strict';
angular.module('loopback-admin').config(function ($stateProvider) {
    return $stateProvider.state('app', {
        abstract: true,
        template: '<div ui-view></div>',
        resolve: {
            user: function (LoopBackAdminConfiguration) {
                var User;
                User = LoopBackAdminConfiguration.userModel;
                return User.getCurrent().$promise;
            },
            config: function (user, LoopBackAdminConfiguration) {
                return LoopBackAdminConfiguration.initialize();
            }
        }
    }).state('browser', {
        parent: 'app',
        abstract: true,
        controller: 'BrowserController',
        controllerAs: 'browserController',
        templateUrl: "templates/routing/browser.tpl.html",
        resolve: {
            config: function (LoopBackAdminConfiguration) {
                return LoopBackAdminConfiguration.initialize();
            }
        }
    });
});

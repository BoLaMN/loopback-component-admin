'use strict';
angular.module('loopback-admin').controller('BrowserController', function ($scope, $state, LoopBackAdminConfiguration) {
    var application, vm;
    vm = this;
    application = LoopBackAdminConfiguration;
    vm.menu = application.menu;
});

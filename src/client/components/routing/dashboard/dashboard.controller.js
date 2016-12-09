'use strict';
angular.module('loopback-admin').controller('DashboardController', function (models) {
    var vm;
    vm = this;
    vm.models = models;
});

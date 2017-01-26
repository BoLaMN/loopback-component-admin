'use strict';
angular.module('loopback-admin').controller('registerController', function ($state, LoopBackAdminConfiguration) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.login = function () {
        var request;
        request = User.login(vm.data);
        return request.$promise.then(function (data) {
            $state.go('dashboard');
        })["catch"](function (err) {
            vm.error = err;
        });
    };
});

'use strict';
angular.module('loopback-admin').controller('loginController', function ($state, $rootScope, LoopBackAdminConfiguration, $scope, $mdDialog) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.userLoginField = LoopBackAdminConfiguration.userLoginField;
    vm.login = function (credentials) {
        var request;
        request = User.login(credentials);
        return request.$promise.then(function (data) {
            if (data.user.role === 'admin') {
                $state.go('dashboard');
            } else {
                User.logout();
            }
        })["catch"](function (err) {
            vm.error = err;
        });
    };
    vm.showPasswordResetModal = function ($event) {
        $mdDialog.show({
            templateUrl: 'templates/modals/reset-password.html',
            targetEvent: $event,
            controller: 'ResetPasswordCtrl',
            controllerAs: 'resetPassword',
            clickOutsideToClose: true
        });
    };
}).controller('ResetPasswordCtrl', function ($mdDialog, LoopBackAdminConfiguration) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.resetPasswordError = '';
    vm.closePasswordResetModal = function () {
        vm.resetPasswordError = '';
        vm.passResetCredentials = {};
        $mdDialog.hide();
    };
    vm.resetPassword = function (passResetCredentials) {
        User.resetPassword(passResetCredentials).$promise.then(function (data) {
            $rootScope.showToast(data);
            return vm.closePasswordResetModal();
        })["catch"](function (data) {
            vm.resetPasswordError = data.email || data;
        });
    };
});

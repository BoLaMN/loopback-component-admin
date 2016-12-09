'use strict';
angular.module('loopback-admin').directive('cmsSocialButtons', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/common/social-buttons.tpl.html',
        controller: 'SocialLoginCtrl',
        controllerAs: 'social'
    };
}).controller('SocialLoginCtrl', function (LoopBackAdminConfiguration, LoopBackAuth, $http, $state, $mdDialog, $mdToast) {
    var vm;
    vm = this;
    vm.credentials = {};
    vm.loginWith = function (service) {
        var left, options, top, url;
        url = LoopBackAdminConfiguration.urlBase + '/auth/social/' + service;
        left = screen.width / 2 - (580 / 2);
        top = screen.height / 2 - (450 / 2);
        window.$tempScope = vm;
        options = ['menubar=0', 'location=0', 'toolbar=0', 'titlebar=0', 'status=0', 'width=580', 'height=450', 'left=' + left, 'top=' + top].join(', ');
        window.open(url, 'Authenticate Account', options);
    };
    vm.socialLoginCallback = function (user) {
        window.$tempScope = null;
        if (user) {
            LoopBackAuth.currentUserData = user;
            $state.go('dashboard');
        } else {
            vm.requestUserEmail();
        }
    };
    vm.socialLoginCallbackError = function () {
        $mdToast.show($mdToast.simple({
            position: 'bottom right'
        }).content('genericSocialError'));
    };
    vm.createAndLoginUser = function () {
        return $http.post(LoopBackAdminConfiguration.urlBase + '/auth/social/request-email-callback', {
            email: vm.credentials.email
        }).success(function (data) {
            return $state.go('dashboard');
        }).error(function (data) {
            if (data.code === 1) {
                return vm.requestUserPassword();
            }
        });
    };
    vm.connectAccounts = function () {
        return $http.post(LoopBackAdminConfiguration.urlBase + '/auth/social/connect-accounts', {
            password: vm.credentials.password
        }).success(function (data) {
            return $state.go('dashboard');
        }).error(function (data) {
            return vm.errorMessage = data;
        });
    };
    vm.requestUserPassword = function ($event) {
        $mdDialog.show({
            templateUrl: 'templates/modals/request-password.html',
            targetEvent: $event,
            controller: 'SocialLoginCtrl'
        });
    };
    vm.requestUserEmail = function ($event) {
        $mdDialog.show({
            templateUrl: 'templates/modals/request-email.html',
            targetEvent: $event,
            controller: 'SocialLoginCtrl'
        });
    };
});

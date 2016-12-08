'use strict';
angular.module('loopback-admin').controller('AccountSettingsController', function ($upload, $rootScope, activeTab, LoopBackAuth, LoopBackAdminConfiguration) {
    var User, vm;
    vm = this;
    User = LoopBackAdminConfiguration.userModel;
    vm.auth = LoopBackAuth;
    vm.activeTab = activeTab;
    vm.changePassword = function (passwords) {
        User.changePassword(passwords).$promise.then((function (_this) {
            return function (data) {
                $rootScope.showToast(data);
                $rootScope.closeModal();
            };
        })(this));
    };
    vm.getUsernameForCurrentUser = function () {
        if (!this.current || !this.current.email) {
            return;
        }
        if (this.current.username) {
            return this.current.username;
        }
        return this.current.email.split('@')[0];
    };
    vm.updateAccountSettings = function (settings, id) {
        var payload, userId;
        payload = settings || this.auth.currentUserData;
        userId = id || this.auth.currentUserId;
        return User.update({
            where: {
                id: userId
            }
        }, payload).$promise.then((function (_this) {
            return function (data) {
                if (!settings) {
                    $rootScope.showToast('profileUpdateSuccess', true);
                    $rootScope.closeModal();
                    _this.current = data;
                }
            };
        })(this));
    };
    vm.removeAvatar = function () {
        return $http["delete"](LoopBackAdminConfiguration.urlBase + '/employees/' + this.current.id + '/avatar').success(function (data) {
            this.current.avatar_url = '';
            $rootScope.showToast(data);
        });
    };
    vm.upload = function (files) {
        var file;
        if (!files.length) {
            return;
        }
        file = files[0];
        return $upload.upload({
            url: LoopBackAdminConfiguration.urlBase + '/employees/' + id + '/avatar',
            file: file
        }).success(function (data) {
            return LoopBackAuth.currentUserData.avatar_url = data;
        }).error(function (data, code) {
            if (code === 422) {
                return showToast(data.file[0]);
            }
        });
    };
}).directive('cmsCurrentUser', function () {
    return {
        replace: true,
        templateUrl: 'templates/common/current-user.html',
        controllerAs: 'ctrl',
        controller: function ($state, LoopBackAuth, $mdDialog, $upload) {
            var vm;
            vm = this;
            vm.auth = LoopBackAuth;
            vm.state = $state;
            vm.openMenu = function ($mdOpenMenu, ev) {
                return $mdOpenMenu(ev);
            };
            vm.showAccountSettingsModal = function ($event, fieldToFocus) {
                var options;
                options = {
                    templateUrl: 'templates/modals/account-settings.html',
                    targetEvent: $event,
                    locals: {
                        activeTab: 'settings'
                    },
                    clickOutsideToClose: true,
                    controllerAs: 'modal',
                    controller: 'AccountSettingsController'
                };
                if (fieldToFocus === 'avatar') {
                    options.locals.activeTab = 'avatar';
                }
                $mdDialog.show(options);
            };
        }
    };
}).directive('cmsToolbar', function () {
    return {
        replace: true,
        scope: {
            title: '='
        },
        templateUrl: 'templates/common/toolbar.html'
    };
});
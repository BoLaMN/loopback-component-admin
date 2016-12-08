'use strict';
angular.module('loopback-admin').run(function ($rootScope, $mdDialog, $mdToast) {
    $rootScope.closeModal = function () {
        return $mdDialog.hide();
    };
    $rootScope.getAvatar = function (user) {
        if (user.avatar_url) {
            return user.avatar_url;
        }
        return 'images/avatar.png';
    };
    $rootScope.showToast = function (message, theme) {
        var toast;
        if (theme == null) {
            theme = 'default';
        }
        toast = $mdToast.simple({
            position: 'bottom right',
            hideDelay: 2200
        });
        toast.content(message).theme(theme);
        $mdToast.show(toast);
    };
    $rootScope.confirm = function (options) {
        var dialog;
        dialog = $mdDialog.confirm().title(options.title).textContent(options.body).ariaLabel('Confirm dialog.').targetEvent(options.event).ok('Okay').cancel('Cancel');
        return $mdDialog.show(dialog);
    };
});

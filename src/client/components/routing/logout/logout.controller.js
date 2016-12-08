'use strict';
angular.module('loopback-admin').controller('logoutController', function ($location, $rootScope, LoopBackAdminConfiguration) {
    var User;
    User = LoopBackAdminConfiguration.userModel;
    User.logout();
    $location.path('/login');
});

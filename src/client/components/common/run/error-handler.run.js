'use strict';
angular.module('loopback-admin').run(function ($state, $window, $rootScope, $log, LoopBackAdminConfiguration) {
    var User;
    User = LoopBackAdminConfiguration.userModel;
    $rootScope.$on('$stateChangeSuccess', function () {
        return $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error.status === 404) {
            $state.go('error');
            event.preventDefault();
        } else if (error.status === 401) {
            $state.go('logout');
        } else {
            $log.error('State change error: ' + error.message);
            throw error;
        }
    });
    $rootScope.$on('$stateChangeStart', function ($event, toState, toParams, fromState, fromParams) {
        var changeState;
        if (!User.isAuthenticated()) {
            if (toState.name !== 'login' && toState.name !== 'register' && toState.name !== 'landing') {
                $event.preventDefault();
                changeState = $state.go('login');
                changeState.then(function () {
                    $rootScope.$broadcast('$stateChangeSuccess', toState.self, toParams, fromState.self, fromParams);
                });
            }
            return true;
        }
        return true;
    });
});

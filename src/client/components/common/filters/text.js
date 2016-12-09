'use strict';
angular.module('loopback-admin').filter('modelToHuman', function () {
    return function (input) {
        if (input == null) {
            input = '';
        }
        return input.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
});

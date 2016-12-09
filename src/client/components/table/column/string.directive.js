'use strict';
angular.module('loopback-admin').directive('lbStringColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'templates/table/column/string.tpl.html'
    };
});

'use strict';
angular.module('loopback-admin').directive('lbNumberColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            property: '='
        },
        templateUrl: 'templates/table/column/number.tpl.html'
    };
});
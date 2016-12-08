'use strict';
angular.module('loopback-admin').directive('lbBooleanColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'templates/table/column/boolean.tpl.html',
        link: function (scope) {
            scope.isOk = !!scope.value;
        }
    };
});
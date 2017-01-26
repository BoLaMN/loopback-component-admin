'use strict';
angular.module('loopback-admin').directive('lbDateColumn', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            property: '='
        },
        templateUrl: 'templates/table/column/date.tpl.html',
        link: function (scope) {
            var property;
            property = scope.property;
            scope.format = property.format;
            if (!scope.format) {
                scope.format = property.type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss';
            }
        }
    };
});
'use strict';
angular.module('loopback-admin').directive('lbDateProperty', function () {
    return {
        scope: {
            property: '=',
            value: '='
        },
        restrict: 'E',
        templateUrl: 'templates/property/date.tpl.html',
        link: function (scope, element) {
            var property;
            property = scope.property;
            scope.name = property.name;
            scope.rawValue = scope.value;
            scope.$watch('rawValue', function (rawValue) {
                scope.value = property.parse(rawValue);
            });
            scope.v = property.validation;
        }
    };
});

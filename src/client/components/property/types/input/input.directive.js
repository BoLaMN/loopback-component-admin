'use strict';
angular.module('loopback-admin').directive('lbInputProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            form: '=',
            errorMessages: '='
        },
        templateUrl: 'templates/property/input.tpl.html',
        restrict: 'E',
        link: function (scope, element) {
            var property;
            property = scope.property;
            scope.name = property.name;
            scope.v = property.validation;
        }
    };
});

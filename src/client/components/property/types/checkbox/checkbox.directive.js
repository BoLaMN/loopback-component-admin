'use strict';
angular.module('loopback-admin').directive('lbCheckboxProperty', function () {
    return {
        scope: {
            property: '=',
            value: '='
        },
        restrict: 'E',
        templateUrl: 'templates/property/checkbox.tpl.html',
        link: function (scope, element) {
            var property;
            property = scope.property;
            scope.name = property.name;
            scope.v = property.validation;
            scope.value = !!scope.value;
        }
    };
});

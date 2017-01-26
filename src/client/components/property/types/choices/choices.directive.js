'use strict';
angular.module('loopback-admin').directive('lbChoicesProperty', function ($compile, $templateCache) {
    return {
        scope: {
            property: '=',
            value: '=',
            row: '=?'
        },
        restrict: 'E',
        templateUrl: 'templates/property/choices.tpl.html',
        compile: function () {
            return {
                pre: function (scope, element) {
                    var choices, property;
                    property = scope.property;
                    scope.name = property.name;
                    scope.v = property.validation;
                    choices = property.choices ? property.choices : [];
                    return scope.choices = typeof choices === 'function' ? choices(scope.row) : choices;
                },
                post: function (scope) {
                    var listener;
                    listener = scope.$on('choices:update', function (e, data) {
                        scope.scope.choices = data.choices;
                        return scope.$root.$$phase || scope.$digest();
                    });
                    scope.$on('$destroy', function () {
                        return listener();
                    });
                }
            };
        }
    };
});

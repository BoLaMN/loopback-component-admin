'use strict';
angular.module('loopback-admin').directive('lbChoiceProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            row: '=?'
        },
        restrict: 'E',
        templateUrl: 'templates/property/choice.tpl.html',
        compile: function () {
            return {
                pre: function (scope, element) {
                    var choices, property;
                    property = scope.property;
                    scope.name = property.name;
                    scope.v = property.validation;
                    scope.$watch('value', function (newValue, oldValue) {
                        if (newValue !== oldValue && newValue === void 0) {
                            scope.value = null;
                        }
                    });
                    choices = property.choices ? property.choices : [];
                    scope.choices = typeof choices === 'function' ? choices(scope.row) : choices;
                },
                post: function (scope) {
                    var listener, updateChoices;
                    updateChoices = function (choices) {
                        scope.choices = choices;
                        return scope.$root.$$phase || scope.$digest();
                    };
                    listener = scope.$on('choices:update', function (e, data) {
                        return updateChoices(data.choices);
                    });
                    scope.$on('$destroy', function () {
                        return listener();
                    });
                }
            };
        }
    };
});

'use strict';
angular.module('loopback-admin').directive('lbHasManyProperty', function () {
    return {
        scope: {
            property: '=',
            value: '=',
            form: '=',
            errorMessages: '='
        },
        templateUrl: 'templates/property/has-many.tpl.html',
        restrict: 'E',
        link: function (scope, element) {
            var i, len, property, ref, resource, value;
            property = scope.property;
            scope.model = property.getModel();
            resource = scope.model.resource;
            scope.count = 0;
            scope.rows = [];
            ref = scope.value;
            for (i = 0, len = ref.length; i < len; i++) {
                value = ref[i];
                scope.rows.push(new resource(value));
                scope.count++;
            }
            scope.name = property.name;
            scope.v = property.validation;
        }
    };
});

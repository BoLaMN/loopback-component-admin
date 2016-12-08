'use strict';
var extend = function (child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').config(function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('boolean', {
        column: '<lb-boolean-column value="row[property.name]"></lb-boolean-column>',
        field: '<lb-checkbox-property property="::property" value="row[property.name]"></lb-checkbox-property>'
    });
});

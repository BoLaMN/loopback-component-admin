'use strict';
var hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('Property', function (stringUtils) {
    var Property;
    return Property = (function () {
        function Property(name, property) {
            var key, value;
            if (property == null) {
                property = {};
            }
            this["default"] = null;
            this.name = name || Math.random().toString(36).substring(7);
            this.label = stringUtils.camelCase(this.name);
            this.type = "string";
            this.validation = {
                required: false,
                minlength: 0,
                maxlength: 99999
            };
            for (key in property) {
                if (!hasProp.call(property, key)) continue;
                value = property[key];
                this[key] = value;
            }
            this.type = this.type.toLowerCase();
        }

        return Property;

    })();
});

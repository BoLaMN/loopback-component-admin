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

angular.module('loopback-admin').factory('FloatProperty', function (NumberProperty) {
    var FloatProperty;
    return FloatProperty = (function (superClass) {
        extend(FloatProperty, superClass);

        function FloatProperty(name, property) {
            FloatProperty.__super__.constructor.call(this, name, property);
            this.type = 'float';
            this.format = '0.000';
        }

        return FloatProperty;

    })(NumberProperty);
});

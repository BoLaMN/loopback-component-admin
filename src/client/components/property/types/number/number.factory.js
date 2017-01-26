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

angular.module('loopback-admin').factory('NumberProperty', function (Property) {
    var NumberProperty;
    return NumberProperty = (function (superClass) {
        extend(NumberProperty, superClass);

        function NumberProperty(name, property) {
            NumberProperty.__super__.constructor.call(this, name, property);
            this.type = "number";
            this.format = void 0;
        }

        return NumberProperty;

    })(Property);
});

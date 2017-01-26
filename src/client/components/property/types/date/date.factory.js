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

angular.module('loopback-admin').factory('DateProperty', function (Property) {
    var DateProperty;
    return DateProperty = (function (superClass) {
        extend(DateProperty, superClass);

        function DateProperty(name, property) {
            DateProperty.__super__.constructor.call(this, name, property);
            this.format = null;
            this.parse = function (date) {
                if (date == null) {
                    date = null;
                }
                if (date instanceof Date) {
                    return date;
                } else if (angular.isString(date)) {
                    return new Date(date);
                } else {
                    return null;
                }
            };
            this.type = "date";
            return;
        }

        return DateProperty;

    })(Property);
}).factory('DateTimeProperty', function (DateProperty) {
    var DateTimeProperty;
    return DateTimeProperty = (function (superClass) {
        extend(DateTimeProperty, superClass);

        function DateTimeProperty(name, property) {
            DateTimeProperty.__super__.constructor.call(this, name, property);
            this.format = null;
            this.parse = function (date) {
                return date;
            };
            this.type = 'datetime';
        }

        return DateTimeProperty;

    })(DateProperty);
});

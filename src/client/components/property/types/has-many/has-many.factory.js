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

angular.module('loopback-admin').factory('HasManyProperty', function (Property, LoopBackAdminConfiguration) {
    var HasManyProperty;
    return HasManyProperty = (function (superClass) {
        extend(HasManyProperty, superClass);

        function HasManyProperty(name, property) {
            HasManyProperty.__super__.constructor.call(this, name, property);
            this.type = "hasMany";
        }

        HasManyProperty.prototype.getModel = function () {
            return LoopBackAdminConfiguration.getModel(this.model);
        };

        return HasManyProperty;

    })(Property);
});

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

angular.module('loopback-admin').factory('BelongsToProperty', function (Property, LoopBackAdminConfiguration) {
    var BelongsToProperty;
    return BelongsToProperty = (function (superClass) {
        extend(BelongsToProperty, superClass);

        function BelongsToProperty(name, property) {
            BelongsToProperty.__super__.constructor.call(this, name, property);
            this.type = "belongsTo";
        }

        BelongsToProperty.prototype.getModel = function () {
            return LoopBackAdminConfiguration.getModel(this.model);
        };

        return BelongsToProperty;

    })(Property);
});

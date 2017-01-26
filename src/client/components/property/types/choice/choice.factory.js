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

angular.module('loopback-admin').factory('ChoiceProperty', function (Property) {
    var ChoiceProperty;
    return ChoiceProperty = (function (superClass) {
        extend(ChoiceProperty, superClass);

        function ChoiceProperty(name, property) {
            ChoiceProperty.__super__.constructor.call(this, name, property);
            this.type = "choice";
            this.choices = [];
            return;
        }

        ChoiceProperty.prototype.getLabelForChoice = function (value, row) {
            var choice, choices;
            choices = typeof this.choices === 'function' ? this.choices(row) : this.choices;
            choice = choices.filter(function (c) {
                return c.value === value;
            }).pop();
            if (choice) {
                return choice.label;
            } else {
                return null;
            }
        };

        return ChoiceProperty;

    })(Property);
});

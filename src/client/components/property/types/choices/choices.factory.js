'use strict';
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

angular.module('loopback-admin').factory('ChoicesProperty', function(ChoiceProperty) {
  var ChoicesProperty;
  return ChoicesProperty = (function(superClass) {
    extend(ChoicesProperty, superClass);

    function ChoicesProperty(name, property) {
      ChoicesProperty.__super__.constructor.call(this, name, property);
      this.type = "choices";
    }

    return ChoicesProperty;

  })(ChoiceProperty);
});
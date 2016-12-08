'use strict';

angular.module('loopback-admin').factory('BooleanProperty', function (ChoiceProperty) {
    var BooleanProperty;
    return BooleanProperty = (function (superClass) {
        extend(BooleanProperty, superClass);

        function BooleanProperty(name, property) {
            BooleanProperty.__super__.constructor.call(this, name, property);
            this.type = "boolean";
            this.choices = [
                {
                    value: null,
                    label: 'undefined'
                }, {
                    value: true,
                    label: 'true'
                }, {
                    value: false,
                    label: 'false'
                }
            ];
        }

        return BooleanProperty;

    })(ChoiceProperty);
});

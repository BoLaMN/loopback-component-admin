'use strict';
angular.module('loopback-admin').filter('numeraljs', function () {
    return function (input, format) {
        if (input === null || format === null) {
            return input;
        }
        if (format === '') {
            return '';
        }
        return numeral(input).format(format);
    };
});

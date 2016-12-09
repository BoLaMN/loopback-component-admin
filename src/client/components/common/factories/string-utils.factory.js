'use strict';
angular.module('loopback-admin').provider('stringUtils', function () {
    return {
        camelCase: function (text) {
            var f;
            if (!text) {
                return text;
            }
            f = text.charAt(0).toUpperCase();
            text = f + text.substr(1);
            return text.replace(/[-_.\s](.)/g, function (match, group1) {
                return ' ' + group1.toUpperCase();
            });
        },
        $get: function () {
            return {
                camelCase: this.camelCase
            };
        }
    };
});

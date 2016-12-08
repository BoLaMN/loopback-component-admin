'use strict';
angular.module('loopback-admin').factory('LoopbackInjector', function ($injector) {
    return function (modelName) {
        if ($injector.has(modelName)) {
            return $injector.get(modelName);
        } else {
            return void 0;
        }
    };
});

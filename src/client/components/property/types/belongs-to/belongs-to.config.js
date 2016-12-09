'use strict';
angular.module('loopback-admin').config(function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('belongsTo', {
        column: null,
        field: '<lb-belongs-to-property form="form[property.name]" error-messages="errorMessages[property.name]" model="model" property="::property" value="row[property.name]"></lb-belongs-to-property>'
    });
});

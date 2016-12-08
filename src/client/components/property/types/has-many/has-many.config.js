'use strict';
angular.module('loopback-admin').config(function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('hasMany', {
        column: '',
        field: '<lb-has-many-property form="form[property.name]" error-messages="errorMessages[property.name]" model="model" property="::property" value="row[property.name]"></lb-has-many-property>'
    });
});

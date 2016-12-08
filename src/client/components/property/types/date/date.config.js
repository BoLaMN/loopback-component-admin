'use strict';
angular.module('loopback-admin').config(function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('date', {
        column: '<lb-date-column property="::property" value="row[property.name]"></lb-date-column>',
        field: '<lb-date-property property="::property" value="row[property.name]"></lb-date-property>'
    });
});

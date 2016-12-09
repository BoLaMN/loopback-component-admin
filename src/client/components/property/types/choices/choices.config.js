'use strict';
angular.module('loopback-admin').config(function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    fvp.registerPropertyView('choices', {
        column: '<lb-choices-column values="row[property.name]"></lb-choices-column>',
        field: '<lb-choices-property property="::property" row="row" value="row[property.name]"></lb-choices-property>'
    });
    return fvp.registerAlias('array', 'choices');
});

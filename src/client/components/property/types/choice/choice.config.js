'use strict';
angular.module('loopback-admin').config(function (PropertyViewConfigurationProvider) {
    var fvp;
    fvp = PropertyViewConfigurationProvider;
    return fvp.registerPropertyView('choice', {
        column: '<lb-string-column value="::property.getLabelForChoice(row[property.name], row)"></lb-string-column>',
        field: '<lb-choice-property property="::property" row="row" value="row[property.name]"></lb-choice-property>'
    });
});

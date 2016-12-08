'use strict';
angular.module('loopback-admin').provider('PropertyTypeConfiguration', function ($injector) {
    var propertyTypes;
    propertyTypes = {};
    return {
        registerPropertyType: function (type, PropertyType) {
            if (type === 'string' || type === 'objectid') {
                PropertyType = '';
            }
            return propertyTypes[type] = PropertyType + 'Property';
        },
        $get: function () {
            return propertyTypes;
        }
    };
}).provider('PropertyViewConfiguration', function (PropertyTypeConfigurationProvider, stringUtilsProvider) {
    var camelCase, propertyViews, registerPropertyType;
    camelCase = stringUtilsProvider.camelCase;
    registerPropertyType = PropertyTypeConfigurationProvider.registerPropertyType;
    propertyViews = {};
    return {
        registerAlias: function (alias, type) {
            if (propertyViews[type]) {
                propertyViews[alias] = propertyViews[type];
                return registerPropertyType(alias, camelCase(type));
            } else {
                return console.warn('no such type defined for', type, alias);
            }
        },
        registerPropertyView: function (type, PropertyView) {
            propertyViews[type] = PropertyView;
            registerPropertyType(type, camelCase(type));
        },
        $get: function () {
            return propertyViews;
        }
    };
}).run(function ($templateCache, PropertyViewConfiguration) {
    return Object.keys(PropertyViewConfiguration).forEach(function (propertyName) {
        var propery;
        propery = PropertyViewConfiguration[propertyName];
        $templateCache.put(propertyName + '-column', propery.column);
        return $templateCache.put(propertyName + '-field', propery.field);
    });
});

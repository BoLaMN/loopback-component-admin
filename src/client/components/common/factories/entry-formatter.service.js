'use strict';
angular.module('loopback-admin').factory('entryFormatter', function ($filter) {
    return {
        formatDate: function (format) {
            return function (date) {
                return $filter('date')(new Date(date), format);
            };
        },
        formatNumber: function (format) {
            return function (number) {
                return $filter('numeraljs')(number, format);
            };
        },
        formatProperty: function (property) {
            var format, formatDate, formatNumber, label, type;
            label = property.label || property.name;
            type = property.type;
            switch (type) {
                case 'boolean':
                case 'choice':
                case 'choices':
                case 'string':
                case 'text':
                case 'wysiwyg':
                case 'email':
                case 'json':
                case 'file':
                case 'template':
                    (function (entry) {
                        return {
                            name: label,
                            value: entry.values[property.name]
                        };
                    });
                    break;
                case 'number':
                case 'float':
                    format = property.format;
                    formatNumber = this.formatNumber(format);
                    (function (entry) {
                        return {
                            name: label,
                            value: formatNumber(entry.values[property.name])
                        };
                    });
                    break;
                case 'date':
                case 'datetime':
                    format = property.format;
                    if (!format) {
                        format = type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss';
                    }
                    formatDate = this.formatDate(format);
                    (function (entry) {
                        return {
                            name: label,
                            value: formatDate(entry.values[property.name])
                        };
                    });
                    break;
                case 'reference':
                    (function (entry) {
                        return {
                            name: label,
                            value: entry.values[property.name]
                        };
                    });
                    break;
                case 'referenced_many':
                case 'referenced_list':
                    return;
            }
        },
        getFormatter: function (properties) {
            var propertiesFormatters;
            propertiesFormatters = properties.map(this.formatProperty.bind(this));
            return function (entry) {
                var result;
                result = {};
                propertiesFormatters.map(function (formatter) {
                    if (!formatter) {
                        return;
                    }
                    return formatter(entry);
                }).forEach(function (property) {
                    if (!property) {
                        return;
                    }
                    result[property.name] = property.value;
                });
                return result;
            };
        }
    };
});

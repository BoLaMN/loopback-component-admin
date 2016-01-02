'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'boolean',
    column: '<lb-boolean-column value="row[property.name]"></lb-boolean-column>',
    field: '<lb-checkbox-property property="::property" value="row[property.name]"></lb-checkbox-property>'
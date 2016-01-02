'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'float',
    column: '<lb-number-column property="::property" value="row[property.name]"></lb-number-column>',
    field: '<lb-input-property type="number" property="::property" value="row[property.name]"></lb-input-property>'

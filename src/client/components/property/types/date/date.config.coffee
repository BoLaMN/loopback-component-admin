'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'date',
    column: '<lb-date-column property="::property" value="row[property.name]"></lb-date-column>',
    field: '<lb-date-property property="::property" value="row[property.name]"></lb-date-property>'

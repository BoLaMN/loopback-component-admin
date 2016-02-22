'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'string',
    column: '<lb-string-column value="row[property.name]"></lb-string-column>',
    field: '<lb-input-property form="form[property.name]" error-messages="errorMessages[property.name]" property="::property" value="row[property.name]"></lb-input-property>'

  fvp.registerAlias 'ObjectID', 'string'

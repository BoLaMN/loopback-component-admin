'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'belongsTo',
    column: null,
    field: '<lb-belongs-to-property form="form[property.name]" error-messages="errorMessages[property.name]" model="model" property="::property" value="row[property.name]"></lb-belongs-to-property>'
'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'hasMany',
    column: '',
    field: '<lb-has-many-property form="form[property.name]" error-messages="errorMessages[property.name]" model="model" property="::property" value="row[property.name]"></lb-has-many-property>'

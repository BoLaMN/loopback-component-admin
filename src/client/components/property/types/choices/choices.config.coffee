'use strict'

angular.module 'loopback-admin'

.config (PropertyViewConfigurationProvider) ->
  fvp = PropertyViewConfigurationProvider

  fvp.registerPropertyView 'choices',
    column: '<lb-choices-column values="row[property.name]"></lb-choices-column>',
    field: '<lb-choices-property property="::property" row="row" value="row[property.name]"></lb-choices-property>'

  fvp.registerAlias 'array', 'choices'